// solve error in this code

import "./Authcomp.css";
import { auth, storage, db } from "../../config/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useEffect, useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Authcomp = () => {
  const [displayName, setdisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [photoURL, setphotoURL] = useState("");
  const [password, setPassword] = useState("");
  // const navigate = useNavigate();

  const signUp = async () => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const storageRef = ref(storage, displayName);
      const uploadTask = uploadBytesResumable(storageRef, photoURL);

      uploadTask.on(
        (error) => {
          alert(error.message);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });
          });
        }
      );
      alert("successfully signed up");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="d-flex">
      <div className="position-absolute top-50 start-50 translate-middle">
        <div className="container border border-dark shadow-lg p-5">
          <input
            className="form-control my-3 shadow-none"
            type="text"
            placeholder="displayName"
            onChange={(e) => setdisplayName(e.target.value)}
          />
          <input
            className="form-control my-3 shadow-none"
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="form-control my-3 shadow-none"
            type="file"
            onChange={(e) => setphotoURL(e.target.files[0])}
          />
          <input
            className="form-control my-3 shadow-none"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="text-center d-flex justify-content-between">
            <button onClick={signUp} className="btn btn-primary">
              Sign up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Authcomp;
