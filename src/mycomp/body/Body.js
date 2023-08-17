import React, { useState } from "react";
import "./Body.css";
// import Header from "../Header/Header";
import Chat from "../Main/Chat/Chat";
import SideBar from "../Main/SideBar/SideBar";
// import SideBarMain from "../Main/SideBarMain/SideBarMain";
import { motion } from "framer-motion";

function Body({ sidebarOpen }) {
  // const [sidebarOpen, setSidebarOpen] = useState(true);

  // const handleSidebarToggle = (newSidebarOpen) => {
  //   setSidebarOpen(newSidebarOpen);
  //   onToggle(!sidebarOpen);
  // };

  const variants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 1, x: "-100%" },
  };

  const transition = { damping: 0, duration: 0.1 };

  return (
    <body className="d-flex">
      {/* <SideBarMain onToggle={handleSidebarToggle} /> */}
      <motion.div
        variants={variants}
        initial="closed"
        animate={sidebarOpen ? "open" : "closed"}
        transition={transition}
        className={`collapse sidebar bg-dark ${sidebarOpen ? "show" : ""}`}
        id="collapseExample"
      >
        <div>
          <SideBar />
        </div>
      </motion.div>

      <main
        className={`main p-3 d-flex position-absolute end-0 justify-content-end ${
          sidebarOpen ? "ch-body-open" : "ch-body-close"
        }`}
      >
        <div className={`chat w-100`}>
          <Chat sidebarOpen={sidebarOpen} />
        </div>
      </main>
    </body>
  );
}

export default Body;
