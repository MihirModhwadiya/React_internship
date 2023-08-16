import React, { useState } from "react";
import "./App.css";
import Header from "./mycomp/Header/Header";
import Chat from "./mycomp/Main/Chat/Chat";
import SideBar from "./mycomp/Main/SideBar/SideBar";
import SideBarMain from "./mycomp/Main/SideBarMain/SideBarMain";
import Auth from "./mycomp/Auth/auth";
import { motion } from "framer-motion";
import { BrowserRouter as Main, Route, Routes } from "react-router-dom";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleSidebarToggle = (newSidebarOpen) => {
    setSidebarOpen(newSidebarOpen);
  };

  const variants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 1, x: "-100%" },
  };

  const transition = { damping: 0, duration: 0.1 };

  return (
    <>
    <Main>
      <body className="d-flex">
        <SideBarMain onToggle={handleSidebarToggle} />
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
      <Routes>
        <Route exact path="/auth" element={<Auth />} />
      </Routes>
      </Main>
    </>
  );
}

export default App;
