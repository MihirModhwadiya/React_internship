import React from "react";
import "./Chat.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

const Chat = ({ sidebarOpen }) => {
  return (
    <>
      <div className={`chat-block d-flex`}>
        <div className="chat-body d-column-flex">
          <div className="d-flex justify-content-start py-3">hi</div>
          <div className="d-flex justify-content-end py-3">hi</div>
          <div className="d-flex justify-content-start py-3">hi</div>
          <div className="d-flex justify-content-end py-3">hi</div>
          <div className="d-flex justify-content-start py-3">hi</div>
        </div>
        {/* <div className="chat-body d-column-flex">
          <div className="d-flex justify-content-end py-3">hi</div>
          <div className="d-flex justify-content-end py-3">hi</div>
          <div className="d-flex justify-content-end py-3">hi</div>
        </div> */}
      </div>
      <div
        className={`chat-inputs btn-group position-fixed end-0 bottom-0 d-flex align-items-start p-3 ${
          sidebarOpen ? "sidebar-open" : "sidebar-close"
        }`}
      >
        <input
          type="text"
          placeholder="Message"
          className="form-control shadow-none width-control left-0 rounded-end-0"
        />
        <button className="btn btn-light">
          <FontAwesomeIcon icon={faPaperPlane} />
        </button>
      </div>
    </>
  );
};

export default Chat;
