import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState, createContext } from "react";
import { auth } from "../../../config/firebase";

export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
  const [isAuth, setIsAuth] = useState({});

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setIsAuth(user);
    });
    return () => {
      unsub();
    }; 
  }, []);

  return (
    <AuthContext.Provider value={{ isAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
