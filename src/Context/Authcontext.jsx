// src/context/AuthContext.jsx
import React, { createContext, useEffect, useState } from "react";
import base from "../../server/base";
export const AuthContext = createContext({
  user: null,
  setUser: () => {},
  login: async () => {},
  logout: () => {},
  loading: true,
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // try to restore session on mount
  useEffect(() => {
    const restore = async () => {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");
      if (token && userId) {
        try {
          const res = await base.get(`/users/${userId}`);
          setUser(res.data);
        } catch (err) {
          console.error("Session restore failed:", err);
          localStorage.removeItem("token");
          localStorage.removeItem("userId");
          setUser(null);
        }
      }
      setLoading(false);
    };
    restore();
  }, []);

  const login = async (email, password) => {
    const res = await base.post("/users/login", { email, password });
    const { token, user: userObj } = res.data;

    // persist token + userId
    localStorage.setItem("token", token);
    localStorage.setItem("userId", userObj._id);

    setUser(userObj);
    return userObj;
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    setUser(null);
    // optionally redirect to login
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
