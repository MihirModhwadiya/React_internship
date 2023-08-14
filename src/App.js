import React, { useState } from "react";
import "./App.css";
import Header from "./mycomp/Header/Header";
import Chat from "./mycomp/Main/Chat/Chat";
import SideBar from "./mycomp/Main/SideBar/SideBar";
import SideBarMain from "./mycomp/Main/SideBarMain/SideBarMain"; // Import the ToggleButton component
function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleSidebarToggle = (newSidebarOpen) => {
    setSidebarOpen(newSidebarOpen);
  };

  return (
    <>
      <body className="d-flex bg-dark">
        <SideBarMain onToggle={handleSidebarToggle} />

        <div
          className={`collapse sidebar bg-dark ${sidebarOpen ? "show" : ""}`}
          id="collapseExample"
        >
          <div>
            <SideBar />
          </div>
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
    </>
  );
}

export default App;
