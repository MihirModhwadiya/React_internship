import "./Authcomp.css";
import { auth, storage, db } from "../../config/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Authcomp = () => {
  const navigate = useNavigate();

  const signUp = async (e) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const photoURL = e.target[2].files[0];
    const password = e.target[3].value;
    try {
      const q = query(
        collection(db, "users"),
        where("displayName", "==", displayName)
      );
      const snapshot = await getDocs(q);
      console.log(snapshot.empty);
      if (!snapshot.empty) {
        alert("user already exist");
        return;
      }
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const storageRef = ref(storage, displayName);
      const file = photoURL;
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          alert("first error" + error.message);
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
            await setDoc(doc(db, "userChats", res.user.uid), {});
          });
        }
      );

      alert("successfully signed up");
      navigate("/Body");
    } catch (error) {
      switch (error.code) {
        case "auth/email-already-in-use":
          alert("E-mail already in use.");
          break;
        case "auth/invalid-email":
          alert("Invalid e-mail address format.");
          break;
        case "auth/weak-password":
          alert("Password is too weak.");
          break;
        case "auth/too-many-requests":
          alert("Too many request. Try again in a minute.");
          break;
        default:
          alert("Check your internet connection.");
          break;
      }
    }
  };

  return (
    <div className="d-flex">
      <div className="position-absolute top-50 start-50 translate-middle">
        <form onSubmit={signUp} className="container border border-dark shadow-lg p-5">
          <input
            className="form-control my-3 shadow-none"
            type="text"
            pattern="[A-Za-z0-9]+"
            placeholder="displayName"
          />
          <input
            className="form-control my-3 shadow-none"
            type="email"
            placeholder="Email"
          />
          <input
            className="form-control my-3 shadow-none"
            type="file"
          />
          <input
            className="form-control my-3 shadow-none"
            type="password"
            placeholder="Password"
          />
          <div className="text-center d-flex justify-content-center">
            <button type="submit" className="btn btn-primary">
              Sign up
            </button>
          </div>
          <div className="text-center d-flex justify-content-center">
            <p>
              create account?
              <a href="/AuthLogIn">Sign In</a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Authcomp;
