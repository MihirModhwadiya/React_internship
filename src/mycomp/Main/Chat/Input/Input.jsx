import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useState } from "react";
import { ChatContext } from "../ChatContext/ChatContext";
import { AuthContext } from "../../../Auth/AuthContext/AuthContext";
import {
  Timestamp,
  arrayUnion,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { v4 as uuid } from "uuid";
import { db, storage } from "../../../../config/firebase";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const Input = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);
  let imgpreviewURL;
  const { isAuth } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  const [pdfUrl, setPdfUrl] = useState(null);

  const handleSend = async () => {
    if (img) {
      if (img.type === "application/pdf") {
        // Handle PDF file
        const pdfBlob = new Blob([img], { type: "application/pdf" });
        const pdfReader = new FileReader();

        let unique = uuid();

        pdfReader.onload = async (e) => {
          const typedArray = new Uint8Array(e.target.result);
          const loadingTask = pdfjs.getDocument(typedArray);

          loadingTask.promise.then(async (pdfDocument) => {
            // Generate a PDF preview image (first page)
            const pdfCanvas = document.createElement("canvas");
            const pdfContext = pdfCanvas.getContext("2d");
            const pdfPage = await pdfDocument.getPage(1);
            const viewport = pdfPage.getViewport({ scale: 1 });
            pdfCanvas.width = viewport.width;
            pdfCanvas.height = viewport.height;
            await pdfPage.render({ canvasContext: pdfContext, viewport })
              .promise;

            const pdfPreviewDataUrl = pdfCanvas.toDataURL("image/jpeg");
            imgpreviewURL = pdfPreviewDataUrl;
          });
        };

        const storageRef = ref(storage, unique);

        const uploadTask = uploadBytesResumable(storageRef, pdfBlob);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            // switch (snapshot.state) {
            //   case "paused":
            //     console.log("Upload is paused");
            //     break;
            //   case "running":
            //     console.log("Upload is running");
            //     break;
            // }
          },
          (error) => {
            alert("first error" + error.message);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then(async (pdfUrl) => {
              // Store the PDF URL in the state
              // setPdfUrl(pdfUrl);
              // console.log(pdfUrl);
              await updateDoc(doc(db, "chats", data.chatId), {
                messages: arrayUnion({
                  id: unique,
                  text,
                  senderId: isAuth.uid,
                  date: Timestamp.now(),
                  pdfPreview: imgpreviewURL, // Store the PDF preview
                  pdfURL: pdfUrl, // Store the PDF URL
                }),
              });
              // ... (existing code)
            });
          }
        );

        setPdfUrl(null);
        setText(null);
        setImg(null);
        pdfReader.readAsArrayBuffer(pdfBlob);
      } else {
        const storageRef = ref(storage, uuid());
        const uploadTask = uploadBytesResumable(storageRef, img);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            // switch (snapshot.state) {
            //   case "paused":
            //     console.log("Upload is paused");
            //     break;
            //   case "running":
            //     console.log("Upload is running");
            //     break;
            // }
          },
          (error) => {
            alert("first error" + error.message);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then(
              async (downloadURL) => {
                await updateDoc(doc(db, "chats", data.chatId), {
                  messages: arrayUnion({
                    id: uuid(),
                    text,
                    senderId: isAuth.uid,
                    date: Timestamp.now(),
                    img: downloadURL,
                  }),
                });
              }
            );
          }
        );
      }
    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: isAuth.uid,
          date: Timestamp.now(),
        }),
      });
    }

    await updateDoc(doc(db, "userChats", isAuth.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    setText(null);
    setImg(null);
  };
  return (
    <>
      <div className="">
        <input
          type="file"
          placeholder="Message"
          id="file"
          style={{ display: "none" }}
          onChange={(e) => setImg(e.target.files[0])}
        />

        <label htmlFor="file" className="btn btn-light">
          file
        </label>
      </div>

      <input
        value={text == null ? "" : text}
        type="text"
        placeholder="Message"
        className="form-control shadow-none width-control left-0 rounded-end-0"
        onChange={(e) => setText(e.target.value)}
      />
      {(text === null || text[0] === " " || text === "") && !img ? null : (
        <button onClick={handleSend} className="btn btn-light">
          <FontAwesomeIcon icon={faPaperPlane} />
        </button>
      )}
    </>
  );
};

export default Input;
