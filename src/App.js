import React, { useContext, useEffect, useState } from "react";
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
  // const [sidebarOpen, setSidebarOpen] = useState(true);

  // const handleSidebarToggle = () => {
  //   setSidebarOpen(!sidebarOpen);
  // };

  const { isAuth } = useContext(AuthContext);

  const ProtectedRoute = ({ children }) => {
    if (!isAuth) {
      return <Navigate to="/AuthLogIn" />;
    }
    return children;
  };

  return (
    <>
      <Main>
        <div className="d-flex">
          {/* <SideBarMain onToggle={handleSidebarToggle} /> */}

          <Routes>
            {/* <Route path="/"> */}
            <Route
              // exact
              index
              // path="/Body"
              element={
                //make given code loads only one time it is loading 2 timesl
                <ProtectedRoute>
                  <Body/>
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
                  <Body/>
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
