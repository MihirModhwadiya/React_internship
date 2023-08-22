import React, { useContext } from "react";
// import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../../../Auth/AuthContext/AuthContext";
import { ChatContext } from "../ChatContext/ChatContext";

const Message = ({ message }) => {
  const { isAuth } = useContext(AuthContext);
  const { curruser } = useContext(ChatContext);

  // const ref = useRef();
  // useEffect(() => {
  //   ref.current?.scrollIntoView({ behavior: "smooth" });
  // }, [message]);

  console.log(message);

  return (
    <>
      <div
        // ref={ref}
        className={`message ${
          message.senderId === isAuth.uid
            ? "d-flex align-items-center justify-content-end py-3"
            : "d-flex align-items-center justify-content-start py-3"
        }`}
      >
        {message.senderId === isAuth.uid ? (
          // <img src={isAuth.photoURL} width="20px" height={"20px"} alt="" />
          null
        ) : (
          <img src={curruser.photoURL} width="20px" height={"20px"} alt="" />
        )}
        <h3>{message.text && message.text}</h3>
        {message.img && (
          <img
            src={message === undefined ? null : message.img}
            width="200px"
            alt=""
          />
        )}
        {message.senderId === isAuth.uid ? (
          <img src={isAuth.photoURL} width="20px" height={"20px"} alt="" />
        ) : (
          // <img src={curruser.photoURL} width="20px" height={"20px"} alt="" />
          null
        )}
        <br />
      </div>
    </>
  );
};

export default Message;
