/* eslint-disable react-hooks/exhaustive-deps */
// AuthContext.tsx

"use client";
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";

// Define the shape of the AuthContext
type AuthContextType = {
  token: string | null;
  user: any | null;
  login: (token: string, user: any) => void;
  logout: () => void;
};

// Create the AuthContext
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// API to fetch user info using the token
export const fetchUserInfo = async (token: string) => {
  // <- make this exportable
  try {
    const response = await axios.get("https://alsaifgallery.onrender.com/api/v1/user/getUserInfo", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.data; // Assuming user info is in response.data.data
  } catch (error) {
    console.error("Error fetching user info:", error);
    return null;
  }
};

// Provider component that wraps your app and makes auth object available to child components
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(Cookies.get("token") || null);
  const [user, setUser] = useState<any | null>(null);

  // Fetch user info if token exists
  useEffect(() => {
    if (token && !user) {
      fetchUserInfo(token).then((userInfo) => {
        if (userInfo) setUser(userInfo);
        else logout(); // If user info couldn't be fetched, log out
      });
    }
  }, [token]);

  // Login function to store token and user
  const login = (token: string, user: any) => {
    setToken(token);
    setUser(user);
    Cookies.set("token", token, { expires: 7 }); // Store token in cookie for 7 days
  };

  // Logout function to clear token and user
  const logout = () => {
    setToken(null);
    setUser(null);
    Cookies.remove("token");
    Cookies.remove("user");
    window.location.reload(); // Refresh the page to clear the state
  };

  return <AuthContext.Provider value={{ token, user, login, logout }}>{children}</AuthContext.Provider>;
};

// Hook for child components to get the auth object and re-render when it changes
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
