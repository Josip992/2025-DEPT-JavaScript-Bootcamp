import { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(() =>
    localStorage.getItem("accessToken")
  );
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });

  const register = (email) => {
    setUser({ email });
    localStorage.setItem("user", JSON.stringify({ email }));
  };

  const login = (jwt, email) => {
    setAccessToken(jwt);
    setUser({ email });
    localStorage.setItem("accessToken", jwt);
    localStorage.setItem("user", JSON.stringify({ email }));
  };

  const logout = () => {
    setAccessToken(null);
    setUser(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    localStorage.removeItem("cachedColors");
  };

  const isAuthenticated = !!accessToken;

  const value = {
    accessToken,
    user,
    isAuthenticated,
    register,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
