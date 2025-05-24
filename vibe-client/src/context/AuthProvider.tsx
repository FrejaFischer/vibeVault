import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { axiosInstance } from "../services/api-client";

// This a React Functional Component that wraps our app and provides access to the AuthContext
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // await axios.get("http://localhost:5000/auth/check", { withCredentials: true });
        await axiosInstance.get("/auth/check", { withCredentials: true });
        setIsAuthenticated(true);
      } catch {
        setIsAuthenticated(false);
      }
    };
    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    await axiosInstance.post("/login", { email, password }, { withCredentials: true });
    setIsAuthenticated(true);
  };

  const logout = async () => {
    // await axios.post("http://localhost:5000/logout", {}, { withCredentials: true });
    await axiosInstance.get("/logout", { withCredentials: true });
    setIsAuthenticated(false);
  };

  return <AuthContext.Provider value={{ isAuthenticated, login, logout }}>{children}</AuthContext.Provider>;
};
