import { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const storedUser = localStorage.getItem("user");
  const [me, setMe] = useState(storedUser ? JSON.parse(storedUser) : null);

  const login = (token, user) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    setMe(user);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setMe(null);
  };

  return (
    <AuthContext.Provider value={{ me, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
