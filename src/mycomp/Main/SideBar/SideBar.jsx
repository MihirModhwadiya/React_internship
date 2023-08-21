import "./SideBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useContext, useEffect, useState } from "react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../../config/firebase";
import { AuthContext } from "../../Auth/AuthContext/AuthContext";
import { ChatContext } from "../Chat/ChatContext/ChatContext";

const SideBar = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const { isAuth } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
    );
    try {
      if (username === "" || username === null || username === undefined) {
        setUser(null);
      } else {
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          setUser(doc.data());
        });
      }
    } catch (error) {
      alert(error.message);
    }
    setUsername("")
  };
  const handleKey = () => {
    handleSearch();
  };

  const handleSelect = async () => {
    const combinedId =
      isAuth.uid > user.uid ? isAuth.uid + user.uid : user.uid + isAuth.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        await setDoc(doc(db, "chats", combinedId), { message: [] });

        await updateDoc(doc(db, "userChats", isAuth.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + [".date"]]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: isAuth.uid,
            displayName: isAuth.displayName,
            photoURL: isAuth.photoURL,
          },
          [combinedId + [".date"]]: serverTimestamp(),
        });
      }
    } catch (error) {
      alert(error.message);
    }
  };
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", isAuth.uid), (doc) => {
        setChats(doc.data());
      });
      return () => {
        unsub();
      };
    };
    isAuth.uid && getChats();
  }, [isAuth.uid]);

  const handleSelectforchat = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
  };

  console.log(chats);

  return (
    <div className="mt-3 position-absolute top-0 start-0">
      <div className="btn-group d-flex justify-content-center p-3">
        <input
        value={username ? username : ""}
          className="form-control shadow-none rounded-end-0"
          type="text"
          placeholder="Search"
          onChange={(e) => setUsername(e.target.value)}
        />
        <button onClick={handleKey} className="btn btn-light">
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>
      <ul className="list-group p-1">
        {user && (
          <div
            onClick={handleSelect}
            className="btn rounded-0 border-1 list-group-item bg-transparent text-light d-flex"
          >
            <img src={user.photoURL} width="30px" alt="" />
            <div className="px-3">{user.displayName}</div>
          </div>
        )}
      </ul>
      <ul className="list-group p-1 chats">
        {
          chats && Object.entries(chats)?.sort((a,b)=>b[1].date - a[1].date).map((chat) => (
            <div
              className="userChat btn rounded-0 border-1 list-group-item bg-transparent text-light d-flex"
              key={chat[0]}
              onClick={() => handleSelectforchat(chat[1].userInfo)} // --------------------
            >
              <img src={chat[1].userInfo.photoURL} width="30px" alt="" />
              <div className="userChatInfo">
                <div className="px-3">{chat[1].userInfo.displayName}</div>
              </div>
            </div>
          ))
        }
      </ul>
    </div>
  );
};

export default SideBar;
