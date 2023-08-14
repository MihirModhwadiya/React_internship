import React from "react";
import "./Chat.css"; // Assuming you have a CSS file for the Chat component
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faMessage,
  faPaperPlane,
  faSearch,
  faShare,
  faTentArrowLeftRight,
} from "@fortawesome/free-solid-svg-icons";

const Chat = ({ sidebarOpen }) => {
  return (
    <>
      <div className={`chat-block ${sidebarOpen ? "sidebar-open" : ""}`}>
        <div className="chat-body"></div>
      </div>
      <div
        className={`chat-inputs btn-group position-fixed bottom-0 d-flex align-items-end p-3 ${
          sidebarOpen ? "sidebar-open" : ""
        }`}
        style={{ width: sidebarOpen ? "calc(97% - 250px)" : "97%" }}
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
