import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../../../Auth/AuthContext/AuthContext";

const Message = ({ message }) => {
  const { isAuth } = useContext(AuthContext);

  // const ref = useRef();
  // useEffect(() => {
  //   ref.current?.scrollIntoView({ behavior: "smooth" });
  // }, [message]);

  return (
    <>
      <div
        // ref={ref}
        className={`message ${
          message.senderId === isAuth.uid
            ? "d-flex justify-content-end py-3"
            : "d-flex justify-content-start py-3"
        }`}
      >
        <h3>{message.text && message.text}</h3>
        {message.img && (
          <img
            src={message === undefined ? null : message.img}
            width="300px"
            alt=""
          />
        )}
        <br />
      </div>
    </>
  );
};

export default Message;
