import React, { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../../Auth/AuthContext/AuthContext";
import { ChatContext } from "../ChatContext/ChatContext";

const Message = ({ message }) => {
  const { isAuth } = useContext(AuthContext);
  // const { data } = useContext(ChatContext);
  const { user, setUser } = useState(null);

  const ref = useRef();
  useEffect(() => {
    ref.isAuth?.scrollIntiView({ behavior: "smooth" });
  }, [message]);

  return (
    <>
      <div
      ref={ref}
        className={`message ${
          message.senderId === isAuth.uid
            ? "d-flex justify-content-end py-3"
            : "d-flex justify-content-start py-3"
        }`}
      >
        {/* {message == undefined ? null : message.text} */}
        <h3>{message.text && message.text}</h3>
        {message.img && (
          <img src={message == undefined ? null : message.img} width="300px" />
        )}
        <br />
      </div>
    </>
  );
};

export default Message;
