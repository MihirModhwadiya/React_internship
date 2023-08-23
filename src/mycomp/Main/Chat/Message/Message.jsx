import React, { useContext, useEffect, useRef, useState } from "react";
// import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../../../Auth/AuthContext/AuthContext";
import { ChatContext } from "../ChatContext/ChatContext";
import { pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const Message = ({ message }) => {
  const { isAuth } = useContext(AuthContext);
  const { curruser } = useContext(ChatContext);

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
            ? "d-flex align-items-start justify-content-end py-3"
            : "d-flex align-items-start justify-content-start py-3"
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
          <a href={message.pdfURL} download="testpdf.pdf"  target="_blank" rel="noopener noreferrer" className="message-pdf">
            <img
            src={message === undefined ? null : message.pdfPreview}
            width="200px"
            alt=""
          />
          </a>
        )}
        {message.senderId === isAuth.uid ? (
          <div className="">
          <img src={isAuth.photoURL} width="20px" height={"20px"} alt="" />
          </div>
        ) : null}
        <br />
      </div>
    </>
  );
};

export default Message;
