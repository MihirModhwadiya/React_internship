import "./auth.css";
import { Auth } from "firebase/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";

const auth = () => {
  const signIn = () => {
    // const email = document.querySelector("input[type=email]").value;
    // const password = document.querySelector("input[type=password]").value;
    // createUserWithEmailAndPassword(Auth, email, password)
    //   .then((userCredential) => {
    //     // Signed in
    //     const user = userCredential.user;
    //     console.log(user);
    //     // ...
    //   })
    //   .catch((error) => {
    //     const errorCode = error.code;
    //     const errorMessage = error.message;
    //     console.log(errorCode, errorMessage);
    //     // ..
    //   });
    const [email, setEmail] = useState('');
  };
  return (
    <div className="d-flex">
      <div className="position-absolute top-50 start-50 translate-middle">
        <form
          onSubmit={signIn}
          className="container border border-dark shadow-lg p-5"
        >
          <input
            className="form-control my-3 shadow-none"
            type="username"
            placeholder="Username"
          />
          <input
            className="form-control my-3 shadow-none"
            type="email"
            placeholder="Email"
          />
          <input
            className="form-control my-3 shadow-none"
            type="password"
            placeholder="Password"
          />
          <div className="text-center">
            <button className="btn btn-primary">Sign up</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default auth;
