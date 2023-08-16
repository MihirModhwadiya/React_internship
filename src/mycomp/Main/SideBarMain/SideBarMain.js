import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const SideBarMain = ({ onToggle }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleToggleClick = () => {
    setSidebarOpen(!sidebarOpen);
    onToggle(!sidebarOpen);
  };

  return (
    <div className="bg-primary">
      <div className="text-light">
        <button
          className="navbar-toggler p-3"
          type="button"
          onClick={handleToggleClick}
        >
          <FontAwesomeIcon icon={faBars} />
        </button>
        <br />
        <a href="/auth" className="btn">
          Auth
        </a>
        <br />
        <a href="/auth" className="btn">
          Home
        </a>
        <br />
      </div>
    </div>
  );
};

export default SideBarMain;
