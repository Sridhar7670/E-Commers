
"use client";

import { createContext, useState, useEffect, ReactNode, useContext } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

// Define the shape of the user payload from the JWT
interface UserPayload {
  name: string;
  id: number;
  email: string;
}

// Define the shape of the context's value
interface AuthContextType {
  isLoggedIn: boolean;
  user: UserPayload | null;
  login: (token: string) => void;
  logout: () => void;
}

// Create the context with a default value of null
const AuthContext = createContext<AuthContextType | null>(null);

// Create the provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<UserPayload | null>(null);

  // On initial load, check if a token exists in the cookies
  useEffect(() => {
    const token = Cookies.get("accessToken");
    if (token) {
      try {
        const decodedUser = jwtDecode<UserPayload>(token);
        setUser(decodedUser);
        setIsLoggedIn(true);
      } catch (error) {
        console.error("Invalid token:", error);
        Cookies.remove("accessToken"); // Remove invalid token
      }
    }
  }, []);

  // Login function: saves token, decodes it, and updates state
  const login = (token: string) => {
    // console.log(token,"at Authprovider")
    Cookies.set("accessToken", token);
    const decodedUser = jwtDecode<UserPayload>(token);
    console.log(decodedUser)
    setUser(decodedUser);
    setIsLoggedIn(true);
  };

  // Logout function: removes token and resets state
  const logout = () => {
    Cookies.remove("accessToken");
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to easily use the auth context in other components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};