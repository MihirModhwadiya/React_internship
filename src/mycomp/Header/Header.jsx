import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faVideoCamera } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../Auth/AuthContext/AuthContext";

const Header = ({handleCall}) => {
  const { isAuth } = useContext(AuthContext);
  const [callStatus, setCallStatus] = useState(false);

  const funnCallStatus = () => {
    setCallStatus(!callStatus);
    handleCall();
  };
  return (
    <nav className="nav p-1 pe-3">
      <div className="btn-group" type="button">
        <button onClick={funnCallStatus} className="btn btn-light px-2">
          <FontAwesomeIcon icon={faPhone} />
        </button>
        <button onClick={funnCallStatus} className="btn btn-light px-2">
          <FontAwesomeIcon icon={faVideoCamera} />
        </button>
      </div>
      {isAuth ? (
        <div className="border-1 d-flex ps-3">
          <div className="bg-light d-flex align-items-center">
            <img
              src={isAuth.photoURL}
              height="40px"
              width="60px"
              className=""
              alt=""
            />
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
