import React, { useContext, useEffect, useRef, useState } from "react";
// import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../../../Auth/AuthContext/AuthContext";
import { ChatContext } from "../ChatContext/ChatContext";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const Message = ({ message }) => {
  const { isAuth } = useContext(AuthContext);
  const { curruser } = useContext(ChatContext);
  console.log(message.pdfUrl);

  const [pdfPages, setPdfPages] = useState([]); // Array to store PDF pages

  useEffect(() => {
    if (message.pdfUrl) {
      const pdfBlob = new Blob([message.pdfUrl], { type: "application/pdf" });
      const pdfReader = new FileReader();

      pdfReader.onload = async (e) => {
        const typedArray = new Uint8Array(e.target.result);
        const loadingTask = pdfjs.getDocument(typedArray);

        loadingTask.promise.then(async (pdfDocument) => {
          const pages = [];

          for (let pageNum = 1; pageNum <= pdfDocument.numPages; pageNum++) {
            const pdfPage = await pdfDocument.getPage(pageNum);
            pages.push(pdfPage);
          }

          setPdfPages(pages);
        });
      };

      pdfReader.readAsArrayBuffer(pdfBlob);
    }
  }, [message.pdfUrl]);

  // const reff = useRef();
  // useEffect(() => {
  //   reff.current.scrollIntoView({ behavior: "smooth" });
  // }, [message]);

  return (
    <>
      <div
        // ref={reff}
        className={`message ${
          message.senderId === isAuth.uid
            ? "d-flex align-items-center justify-content-end py-3"
            : "d-flex align-items-center justify-content-start py-3"
        }`}
      >
        {message.senderId === isAuth.uid ? null : ( // <img src={isAuth.photoURL} width="20px" height={"20px"} alt="" />
          <img src={curruser.photoURL} width="20px" height={"20px"} alt="" />
        )}
        <h3
          class="me-2 text-break"
          style={{
            maxWidth: "40%",
            wordWrap: "break-word",
          }}
        >
          {message.text && message.text}
        </h3>
        {message.img && (
          <img
            src={message === undefined ? null : message.img}
            width="200px"
            alt=""
          />
        )}
        {message.pdfPreview && (
          // Display PDF preview
          // <div className="message-pdf">
          //   {/* <Document file={message.pdfUrl}>
          //     <Page pageNumber={1} width={200} />
          //   </Document> */}
          //   <img
          //   src={message === undefined ? null : message.pdfPreview}
          //   width="200px"
          //   alt=""
          // />
          // </div>
          <div className="pdf-preview">
            {message.pdfPreview && (
              <div className="pdf-preview">
                <div>
                  <span>
                    Page {message.currentPage} of {message.pdfNumPages}
                  </span>
                </div>
                <img
                  src={message.pdfPreview}
                  alt={`Page ${message.currentPage}`}
                />
              </div>
            )}
          </div>
        )}
        {message.senderId === isAuth.uid ? (
          <img src={isAuth.photoURL} width="20px" height={"20px"} alt="" />
        ) : null}
        <br />
      </div>
    </>
  );
};

export default Message;
