import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faHome,
  faPerson,
  faSignIn,
  faSignOut,
} from "@fortawesome/free-solid-svg-icons";
import { signOut } from "firebase/auth";
import { auth } from "../../../config/firebase";
import { AuthContext } from "../../Auth/AuthContext/AuthContext";

const SideBarMain = ({ onToggle }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleToggleClick = () => {
    setSidebarOpen(!sidebarOpen);
    onToggle();
  };
  
  const { isAuth } = useContext(AuthContext);

  return (
    <div className="bg-primary">
      <div className="text-light" style={{ height: "700vh" }}>
        {isAuth ? (
          <seaction>
            <button
              className="navbar-toggler p-3"
              type="button"
              onClick={handleToggleClick}
            >
              <FontAwesomeIcon icon={faBars} />
            </button>
            <br />

            <a href="/Body" className="btn text-light">
              <FontAwesomeIcon icon={faHome} />
            </a>
            <br />
          </seaction>
        ) : null}

        {isAuth ? null : (
          <div>
            <a href="/Authcomp" className="btn text-light">
              <FontAwesomeIcon icon={faPerson} />
            </a>
            <br />

            <a href="/AuthLogIn" className="btn text-light">
              <FontAwesomeIcon icon={faSignIn} />
            </a>
            <br />
          </div>
        )}

        {isAuth ? (
          <a className="btn text-light" onClick={() => signOut(auth)}>
            <FontAwesomeIcon icon={faSignOut} />
          </a>
        ) : null}
        <br />
        {isAuth ? (
          <a className="btn text-light position-fixed bottom-0 mb-3">
            <img src={isAuth.photoURL} width="30px" />
          </a>
        ) : null}
        <br />
      </div>
    </div>
  );
};

export default SideBarMain;
