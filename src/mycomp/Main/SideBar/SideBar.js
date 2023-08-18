import "./SideBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useContext, useState } from "react";
import {
  collection,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../../config/firebase";
import { AuthContext } from "../../Auth/AuthContext/AuthContext";

const SideBar = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const { isAuth } = useContext(AuthContext);

  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
    );
    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (error) {
      alert(error.message);
    }
  };
  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };
  const handleSelect = async () => {
    const combinedId =
      isAuth.uid > user.uid ? isAuth.uid + user.uid : user.uid + isAuth.uid;
    try {
      const res = await getDocs(db, "chats", combinedId);

      if (!res.exists()) {
        await setDoc(doc(db, "chats", combinedId), { message: [] });

        await updateDoc(doc(db, "users", isAuth.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + []]: serverTimestamp(),
        });
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="mt-3 position-relative">
      <div className="btn-group d-flex justify-content-center p-3">
        <input
          className="form-control shadow-none rounded-end-0"
          type="text"
          placeholder="Search"
          onKeyDown={handleKey}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button className="btn btn-light">
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
    </div>
  );
};

export default SideBar;
