import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

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
      </div>
    </div>
  );
};

export default SideBarMain;
