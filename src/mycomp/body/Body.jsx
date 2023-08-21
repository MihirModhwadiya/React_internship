import React, { useState } from "react";
import "./Body.css";
import Chat from "../Main/Chat/Chat";
import SideBar from "../Main/SideBar/SideBar";
import SideBarMain from "../Main/SideBarMain/SideBarMain";
import Header from "../Header/Header";
import { motion } from "framer-motion";

function Body() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [userSelect, setUserSelect] = useState(false);

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleUserSelect = () => {
    setUserSelect(true);
  };

  const variants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 1, x: "-100%" },
  };

  const transition = { damping: 0, duration: 0.1 };

  return (
    <>
      <nav
        className={`navbar bg-dark d-flex position-fixed end-0 top-0 justify-content-end ${
          sidebarOpen ? "ch-body-open ch-body-open-nv" : "ch-body-close-nv"
        }`}
        style={{ zIndex: 10 }}
      >
        <Header />
      </nav>
      <div className="d-flex body">
        <SideBarMain onToggle={handleSidebarToggle} />
        <motion.div
          variants={variants}
          initial="closed"
          animate={sidebarOpen ? "open" : "closed"}
          transition={transition}
          className={`collapse sidebar bg-dark ${sidebarOpen ? "show" : ""}`}
          id="collapseExample"
        >
          <div style={{ zIndex: 9 }}>
            <SideBar h_u_Select={handleUserSelect} />
          </div>
        </motion.div>

        <main
          className={`main p-3 d-flex position-absolute end-0 justify-content-end ${
            sidebarOpen ? "ch-body-open" : "ch-body-close"
          }`}
        >
          <div className={`chat w-100`}>
            {userSelect == true ? <Chat sidebarOpen={sidebarOpen} /> : null}
            {/* <Chat sidebarOpen={sidebarOpen} /> */}
          </div>
        </main>
      </div>
    </>
  );
}

export default Body;
