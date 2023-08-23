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

  const { isAuth } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const [pdfNumPages, setPdfNumPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [PdfPreviewDataUrl,setPdfPreviewDataUrl] = useState(null);

  const handleSend = async () => {
    if (img) {
      if (img.type === "application/pdf") {
        // Handle PDF file
        const pdfBlob = new Blob([img], { type: "application/pdf" });
        const pdfReader = new FileReader();

        pdfReader.onload = async (e) => {
          const typedArray = new Uint8Array(e.target.result);
          const loadingTask = pdfjs.getDocument(typedArray);

          loadingTask.promise.then(async (pdfDocument) => {
            setPdfNumPages(pdfDocument.numPages);

            // Generate a PDF preview image (first page)
            const pdfCanvas = document.createElement("canvas");
            const pdfContext = pdfCanvas.getContext("2d");
            const pdfPage = await pdfDocument.getPage(3);
            const viewport = pdfPage.getViewport({ scale: 1 });
            pdfCanvas.width = viewport.width;
            pdfCanvas.height = viewport.height;
            await pdfPage.render({ canvasContext: pdfContext, viewport })
              .promise;

            // Convert the canvas image to a data URL
            const pdfPreviewDataUrl = pdfCanvas.toDataURL("image/jpeg");

            // Perform other PDF-related actions if needed

            // Update the state with the PDF preview data
            setPdfPreviewDataUrl(pdfPreviewDataUrl);
            setCurrentPage(1);
            setPdfNumPages(pdfDocument.numPages);

            // Store the PDF preview data URL in Firestore
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: isAuth.uid,
                date: Timestamp.now(),
                pdfPreview: pdfPreviewDataUrl, // Store the PDF preview
                currentPage,
                pdfNumPages
              }),
            });
          });
        };

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
    setCurrentPage(1);
  };
  // const handleFileChangee = (e) => {
  //   const selectedFile = e.target.files[0];
  //   setFile(selectedFile);

  //   if (selectedFile && selectedFile.type === "application/pdf") {
  //     // For PDFs, get number of pages
  //     const pdf = new Blob([selectedFile], { type: "application/pdf" });
  //     const reader = new FileReader();

  //     reader.onload = (e) => {
  //       const typedArray = new Uint8Array(e.target.result);
  //       const loadingTask = window.pdfjsLib.getDocument(typedArray);

  //       loadingTask.promise.then((pdfDocument) => {
  //         setPdfNumPages(pdfDocument.numPages);
  //       });
  //     };

  //     reader.readAsArrayBuffer(pdf);
  //   }
  // };

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
