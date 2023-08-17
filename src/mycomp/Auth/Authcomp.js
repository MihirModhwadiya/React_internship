import "./Authcomp.css";
import { auth, storage, db } from "../../config/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Authcomp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [userPhoto, setuserPhoto] = useState("");
  const [password, setPassword] = useState("");

  const signUp = async () => {
    try {
      // const navigator = useNavigate();
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const storageRef = ref(storage, username);
      const uploadTask = uploadBytesResumable(storageRef, userPhoto);

      uploadTask.on(
        (error) => {
          alert(error.message);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateProfile(res.user, {
              username,
              userPhoto: downloadURL,
            });
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              username,
              email,
              userPhoto: downloadURL,
            });
            // await setDoc(doc(db, "userchats", res.user.uid), {

            // });
          });
        }
      );
      alert("successfully signed up");
    } catch (error) {
      alert(error.message);
    }
  };
  const signIn = async () => {
    try {
      const logg = await signInWithEmailAndPassword(auth, email, password);
      alert("Sign in successful " + logg.user.email);
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
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
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
            onChange={(e) => setuserPhoto(e.target.files[0])}
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
            <button onClick={signIn} className="btn btn-primary">
              Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Authcomp;
