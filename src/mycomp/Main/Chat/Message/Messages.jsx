import React, { useContext, useEffect, useState } from "react";
import { ChatContext } from "../ChatContext/ChatContext";
import { doc, onSnapshot } from "firebase/firestore";
import Message from "./Message";
import { db } from "../../../../config/firebase";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });
    return () => {
      unSub();
    };
  }, [data.chatId]);

  return (
    <div>
      {messages && messages.map((m) => (
        <Message message={m} key={m.id} />
      ))}
    </div>
  );
};

export default Messages;
