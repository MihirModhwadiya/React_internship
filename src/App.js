import React, { useState } from "react";
import "./App.css";
import Header from "./mycomp/Header/Header";
import Chat from "./mycomp/Main/Chat/Chat";
import SideBar from "./mycomp/Main/SideBar/SideBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <body className="d-flex">
      <div className="bg-primary">
        <div className="text-light">
          <a
            className="navbar-toggler p-3"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#collapseExample"
            aria-controls="collapseExample"
            aria-expanded="false"
            aria-label="Toggle sidebar"
            onClick={handleSidebarToggle}
          >
            <FontAwesomeIcon icon={faBars} />
          </a>
        </div>
      </div>

      <div
        className={`collapse sidebar bg-dark ${sidebarOpen ? "show" : ""}`}
        id="collapseExample"
      >
        <SideBar />
      </div>

      <main
        className={`main position-relative ${
          sidebarOpen ? "sidebar-open" : ""
        }`}
      >
        <div className="chat">
          <Chat sidebarOpen={sidebarOpen} />
        </div>
      </main>
    </body>
  );
}

export default App;
