import React, { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faPhone, faVideoCamera } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../Auth/AuthContext/AuthContext";

const Header = () => {
  const { isAuth } = useContext(AuthContext);

  return (
    <nav className="nav p-1 pe-3">
      <div className="btn-group" type="button">
        <button className="btn btn-light px-2">
          <FontAwesomeIcon icon={faPhone} />
        </button>
        <button className="btn btn-light px-2">
          <FontAwesomeIcon icon={faVideoCamera} />
        </button>
      </div>
      {isAuth ? (
        <div className="border-1 d-flex ps-3">
          <div className="bg-light d-flex align-items-center">
            <img src={isAuth.photoURL} width="60px" className="" alt="" />
          </div>
          <div className="d-flex align-items-center ps-3">
            <h5 className="text-light">{isAuth.displayName}</h5>
          </div>
        </div>
      ) : null}
      <br />
    </nav>
  );
};

export default Header;
