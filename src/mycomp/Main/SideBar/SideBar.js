import "./SideBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { collection, getDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../config/firebase";

const SideBar = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);

  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
    );

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data())
      });
    } catch (error) {
      alert(error.message);
    }
  };
  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
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
          <div className="btn rounded-0 border-1 list-group-item bg-transparent text-light d-flex">
            <img src={user.photoURL} width="30px" alt="" />
            <div className="px-3">{user.displayName}</div>
          </div>
        )}
      </ul>
    </div>
  );
};

export default SideBar;
