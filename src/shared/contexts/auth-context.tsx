"use client";

import { getDataLocal } from "@/lib/utils";
import { AuthValueType, UserType } from "@/types/types";
import { createContext, useContext, useEffect, useState } from "react";

const defaultProvider = {
  user: null,
  setUser: () => null,
  handleLogout: () => {},
};

const AuthContext = createContext<AuthValueType>(defaultProvider);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserType | null>(null);

  const handleLogout = () => {
    setUser(null);
    window.localStorage.clear();
  };

  useEffect(() => {
    const storedUser = getDataLocal("USER_INFOR");
    if (storedUser) {
      return setUser(storedUser);
    }
  }, []);

  const values = {
    user,
    handleLogout,
    setUser,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
