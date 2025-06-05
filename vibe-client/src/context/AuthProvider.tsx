import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { axiosInstance } from "../services/api-client";

// This a React Functional Component (FC) that wraps our app and provides access to the AuthContext
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // True if valid token
  const [loading, setLoading] = useState(true); // Loading for signaling if auth request is finished

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Send request to check if token is available and valid in users cookie.
        await axiosInstance.get("/auth/check", { withCredentials: true });
        setIsAuthenticated(true);
        setLoading(false);
      } catch {
        // If no token found or is invalid, then the request will respond with 401, and this will happen:
        setIsAuthenticated(false);
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    await axiosInstance.post("/login", { email, password }, { withCredentials: true });
    setIsAuthenticated(true);
  };

  // LOGIN DONT WORK YET - just delete cookie with token manual to logout for now
  const logout = async () => {
    await axiosInstance.get("/logout", { withCredentials: true });
    setIsAuthenticated(false);
  };

  return <AuthContext.Provider value={{ isAuthenticated, loading, login, logout }}>{children}</AuthContext.Provider>;
};

// withCredentials = true - send cookies with the request. So the token come along as well.
