import React, { useContext, useEffect, useState } from "react";
import "./Chat.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../../Auth/AuthContext/AuthContext";
import Messages from "./Message/Messages";
import Input from "./Input/Input";
const Chat = ({ sidebarOpen }) => {
  const { isAuth } = useContext(AuthContext);

  return (
    <>
      <div className={`chat-block d-flex`}>
        <div className="chat-body">
          <Messages/>
        </div>
      </div>
      <div
        className={`chat-inputs btn-group position-fixed end-0 bottom-0 d-flex align-items-start p-3 ${
          sidebarOpen ? "sidebar-open" : "sidebar-close"
        }`}
      >
        <Input/>
      </div>
    </>
  );
};

export default Chat;
