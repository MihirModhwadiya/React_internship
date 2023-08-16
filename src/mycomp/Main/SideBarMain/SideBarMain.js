import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faHome, faSignIn } from "@fortawesome/free-solid-svg-icons";

const SideBarMain = ({ onToggle }) => {
  // const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleToggleClick = () => {
    // setSidebarOpen(!sidebarOpen);
    onToggle();
  };

  return (
    <div className="bg-primary">
      <div className="text-light" style={{ height: "700vh" }}>
        <button
          className="navbar-toggler p-3"
          type="button"
          onClick={handleToggleClick}
        >
          <FontAwesomeIcon icon={faBars} />
        </button>
        <br />

        <a href="/Body" className="btn text-light">
          <FontAwesomeIcon icon={faHome}/>
        </a>
        <br />
        
        <a href="/auth" className="btn text-light">
          <FontAwesomeIcon icon={faSignIn}/>
        </a>
        <br />
      </div>
    </div>
  );
};

export default SideBarMain;
