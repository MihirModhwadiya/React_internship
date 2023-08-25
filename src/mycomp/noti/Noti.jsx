import React, { useContext, useEffect, useState } from "react";
import { ChatContext } from "../Main/Chat/ChatContext/ChatContext";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../config/firebase";
import { AuthContext } from "../Auth/AuthContext/AuthContext";

function showNoti(title, options) {
  if (Notification.permission === "granted") {
    new Notification(title, options);
  }
}

const Noti = () => {
  const { data } = useContext(ChatContext);
  const { curruser } = useContext(ChatContext);
  const [lastmsg, setLastmsg] = useState(null);

  const chatId = data.chatId;

  useEffect(() => {
    const getd = async () => {
      try {
        const chatDoc = await getDoc(doc(db, "userChats", curruser.uid));
        if (chatDoc.exists()) {
          const lastMessage = chatDoc.data();
          setLastmsg(lastMessage[chatId]["lastMessage"]?.text || "");
        } else {
          console.log("Chat document doesn't exist.");
        }
      } catch (error) {
        console.error("Error fetching last message:", error);
      }
    };
    let flag;

    // Set up a listener to detect new messages
    if (curruser.uid != undefined) {
      flag = 0;
      const unsubscribe = onSnapshot(doc(db, "userChats", curruser.uid), () => {
        getd();
        // Check if a new message was sent and trigger a notification
        if (lastmsg != null && flag === 0) {
          showNoti("New Message", {
            body: lastmsg,
            icon: curruser.photoURL,
          });
        }
        flag++;
      });

      return () => {
        // Clean up the listener when the component unmounts
        unsubscribe();
      };
    }
  }, [chatId, data.text, lastmsg]);

  return <div></div>; // The component doesn't need to render anything
};

export default Noti;
