import React, { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../../Auth/AuthContext/AuthContext";

const Message = ({ message }) => {
  const { isAuth } = useContext(AuthContext);
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
