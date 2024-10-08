"use client"
// AuthContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";
import Cookies from "js-cookie";

// Define the shape of the AuthContext
type AuthContextType = {
  token: string | null;
  user: any | null;
  login: (token: string, user: any) => void;
  logout: () => void;
};

// Create the AuthContext
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component that wraps your app and makes auth object available to child components
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(Cookies.get("token") || null);
  const [user, setUser] = useState<any | null>(Cookies.get("user") ? JSON.parse(Cookies.get("user")!) : null);

  // Login function to store token and user
  const login = (token: string, user: any) => {
    setToken(token);
    setUser(user);
    Cookies.set("token", token, { expires: 7 }); // Store token in cookie for 7 days
    // Cookies.set("user", JSON.stringify(user), { expires: 7 }); // Store user info in cookie
  };

  // Logout function to clear token and user
 const logout = () => {
   setToken(null);
   setUser(null);
   Cookies.remove("token");
   Cookies.remove("user");
   window.location.reload(); // Refresh the page
 };


  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook for child components to get the auth object and re-render when it changes
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
