import React, { useContext, useEffect } from "react";
import Authcomp from "./mycomp/Auth/Authcomp";
import AuthLogIn from "./mycomp/Auth/LogIn/AuthLogIn";
import Body from "./mycomp/body/Body";
import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthContext } from "./mycomp/Auth/AuthContext/AuthContext";


function requestNotificationPermission() {
  if (Notification.permission !== "granted") {
    Notification.requestPermission();
  }
}

function App() {
  const { isAuth } = useContext(AuthContext);
  // const [noti,setNoti] = useState(false);

  const ProtectedRoute = ({ children }) => {
    if (!isAuth) {
      return <Navigate to="/AuthLogIn" />;
    }
    return children;
  };

  useEffect(() => {
    requestNotificationPermission();
  }, []);

  return (
    <>
      <HashRouter>
        <div className="d-flex">
          <Routes>
            <Route
              exact
              path="/"
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
                  <Body/>
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </HashRouter>
    </>
  );
}

export default App;
