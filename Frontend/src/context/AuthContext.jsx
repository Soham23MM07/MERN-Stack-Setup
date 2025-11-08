// AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
  const [authUser, setauthUser] = useState(
    JSON.parse(localStorage.getItem("userinfo")) ||
      JSON.parse(localStorage.getItem("userReginfo")) ||
      null
  );
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (authUser !== null) {
      setIsAuthenticated(true);
    }
  }, [authUser]);
  return (
    <AuthContext.Provider
      value={{
        authUser,
        setauthUser,
        isAuthenticated,
        setIsAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
