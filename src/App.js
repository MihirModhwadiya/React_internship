import React, { useContext } from "react";
import Authcomp from "./mycomp/Auth/Authcomp";
import AuthLogIn from "./mycomp/Auth/LogIn/AuthLogIn";
import Body from "./mycomp/body/Body";
import {
  BrowserRouter as Main,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { AuthContext } from "./mycomp/Auth/AuthContext/AuthContext";

function App() {
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
          <Routes>
            <Route
              index
              element={
                <ProtectedRoute>
                  <Body />
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
                  <Body />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </Main>
    </>
  );
}

export default App;
