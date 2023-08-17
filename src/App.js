import React, { useContext, useState } from "react";
import "./App.css";
import Authcomp from "./mycomp/Auth/Authcomp";
import AuthLogIn from "./mycomp/Auth/LogIn/AuthLogIn";
import Body from "./mycomp/body/Body";
import {
  BrowserRouter as Main,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import SideBarMain from "./mycomp/Main/SideBarMain/SideBarMain";
import { AuthContext } from "./mycomp/Auth/AuthContext/AuthContext";
import AuthContextProvider from "./mycomp/Auth/AuthContext/AuthContext";

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
  const { isAuth } = useContext(AuthContext);
  const ProtectedRoute = ({ children }) => {
    if (isAuth == false) {
      return <Navigate to="/authcomp" />;
    }
    return children;
  };

  return (
    <>
      <Main>
        <div className="d-flex">
          <SideBarMain onToggle={handleSidebarToggle} />

          <Routes>
            {/* <Route path="/"> */}
            <Route
              // exact
              index="/Body"
              // path="/Body"
              element={
                <ProtectedRoute>
                  <Body sidebarOpen={sidebarOpen} />
                </ProtectedRoute>
              }
            />
            <Route exact path="/Authcomp" element={<Authcomp />} />
            <Route exact path="/AuthLogIn" element={<AuthLogIn />} />
            <Route
              exact
              path="/Body"
              element={
                <ProtectedRoute>
                  <Body sidebarOpen={sidebarOpen} />
                </ProtectedRoute>
              }
            />
            {/* </Route> */}
          </Routes>
        </div>
      </Main>
    </>
  );
}

export default App;
