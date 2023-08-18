import React, { useContext, useState } from "react";
import { AuthContext } from "../../../Auth/AuthContext/AuthContext";
import { ChatContext } from "../ChatContext/ChatContext";

const Message = ({ message }) => {
  const { isAuth } = useContext(AuthContext);
  // const { data } = useContext(ChatContext);
  const { user, setUser } = useState(null);

  return (
    <>
      <div className={`${message.senderId === isAuth.uid ? "d-flex justify-content-end py-3" : "d-flex justify-content-start py-3"}`}>
        {message == undefined ? null : message.text}
        <br />
      </div>
    </>
  );
};

export default Message;
