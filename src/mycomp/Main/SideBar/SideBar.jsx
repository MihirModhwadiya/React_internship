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
  const [users, setUsers] = useState(null);
  const { isAuth } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  const handleSearch = async () => {
    let charr = username.replace(
      username.charAt(username.length - 1),
      String.fromCharCode(username.charCodeAt(username.length - 1) + 1)
    );
    // console.log(charr);
    console.log(charr);
    const q = query(
      collection(db, "users"),
      // where("displayName", "==", username)
      where("displayName", ">=", username),
      where("displayName", "<=", charr)
    );
    try {
      if (!username) {
        setUsers([]);
      } else {
        const querySnapshot = await getDocs(q);
        const matchingUsers = [];
        querySnapshot.forEach((doc) => {
          matchingUsers.push(doc.data());
        });
        setUsers(matchingUsers);
      }
      // if (username === "" || username === null || username === undefined) {
      //   setUser(null);
      // } else {
      //   const querySnapshot = await getDocs(q);
      //   querySnapshot.forEach((doc) => {
      //     setUser(doc.data());
      //   });
      // }
    } catch (error) {
      alert(error.message);
    }
  };
  // const handleKey = () => {
  //   handleSearch();
  // };

  const handleSelect = async (user) => {
    if (user) {
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
    } else {
      alert("Please select a user");
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

  useEffect(() => {
    handleSearch();
  }, [username]);

  return (
    <div className="mt-3 position-absolute top-0 start-0">
      <div className="btn-group d-flex justify-content-center p-3">
        <input
          className="form-control shadow-none rounded-end-0"
          type="text"
          placeholder="Search"
          onChange={(e) => setUsername(e.target.value)}
        />
        <button className="btn btn-light">
          <FontAwesomeIcon icon={faSearch} />
        </button>
        {/* <input
        value={username ? username : ""}
          className="form-control shadow-none rounded-end-0"
          type="text"
          placeholder="Search"
          onChange={(e) => setUsername(e.target.value)}
        />
        <button onClick={handleKey} className="btn btn-light">
          <FontAwesomeIcon icon={faSearch} />
        </button> */}
      </div>
      <ul className="list-group p-1">
        {users &&
          users.map((user) => (
            <div
              key={user.uid}
              onClick={() => handleSelect(user)}
              className="btn rounded-0 border-1 list-group-item bg-transparent text-light d-flex"
            >
              <img src={user.photoURL} width="30px" alt="" />
              <div className="px-3">{user.displayName}</div>
            </div>
          ))}
      </ul>
      <hr />
      <ul className="list-group p-1 chats">
        {chats &&
          !username &&
          Object.entries(chats)
            ?.sort((a, b) => b[1].date - a[1].date)
            .map((chat) => (
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
            ))}
      </ul>
    </div>
  );
};

export default SideBar;
