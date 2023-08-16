import React, { useState } from "react";
import "./App.css";
import Auth from "./mycomp/Auth/Authcomp";
import Body from "./mycomp/body/Body";
import { BrowserRouter as Main, Route, Routes } from "react-router-dom";
import SideBarMain from "./mycomp/Main/SideBarMain/SideBarMain";

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const variants = {
    open: { opacity: 1, x: 0 },
    closed: { opacity: 1, x: "-100%" },
  };

  const transition = { damping: 0, duration: 0.1 };

  return (
    <>
      <Main>
        <div className="d-flex">
          {/* <div className="bg-primary">  */}
          <SideBarMain
            onToggle={handleSidebarToggle}
          />
          {/* </div> */}
          <Routes>
            <Route
              exact
              path="/body"
              element={<Body sidebarOpen={sidebarOpen} />}
            />
            <Route exact path="/auth" element={<Auth />} />
          </Routes>
        </div>
      </Main>
    </>
  );
}

export default App;
