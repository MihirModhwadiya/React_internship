import "./AuthLogIn.css";
import { auth} from "../../../config/firebase";
import {
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Authcomp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

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
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="form-control my-3 shadow-none"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="text-center d-flex justify-content-between">
            {/* <button onClick={signUp} className="btn btn-primary">
              Sign up
            </button> */}
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
