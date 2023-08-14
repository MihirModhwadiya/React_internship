import React from "react";
import "./Chat.css"; // Assuming you have a CSS file for the Chat component

const Chat = ({ sidebarOpen }) => {
  return (
    <>
      <div className={`chat-block ${sidebarOpen ? "sidebar-open" : ""}`}>
        <div className="chat-body"></div>
      </div>
      <div
        className={`chat-inputs position-fixed bottom-0 d-flex flex-column align-items-end p-3 ${
          sidebarOpen ? "sidebar-open" : ""
        }`}
        style={{ width: sidebarOpen ? "calc(97% - 250px)" : "97%" }}
      >
        <input
          type="text"
          placeholder="Message"
          className="form-control shadow-none width-control left-0"
        />
      </div>
    </>
  );
};

export default Chat;
