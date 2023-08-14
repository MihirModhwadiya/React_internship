import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  return (
    <nav className="navbar bg-dark">
      <div>
        {/* <a
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#collapseExample"
          aria-controls="collapseExample"
          aria-expanded="false"
          aria-label="Toggle sidebar"
        >
          <FontAwesomeIcon icon={faBars} />
        </a> */}
      </div>
    </nav>
  );
};

export default Header;
