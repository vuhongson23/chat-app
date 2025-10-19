"use client";

import socket from "@/lib/socket/socket-client";
import { useAuth } from "@/shared/contexts/auth-context";
import { redirect } from "next/navigation";
import React, { createContext, useContext, useEffect } from "react";

const SocketContext = createContext(socket);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();

  useEffect(() => {
    if (!user?.id) return;
    socket.connect();
    socket.emit("user_connected", user.id);

    socket.on("connect", () => {
      console.log("🟢 Connected with:", socket.id);
    });

    socket.on("disconnect", () => {
      console.log("🔴 Disconnected");
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
  }, [user?.id]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);

  if (!context) {
    throw new Error("useSocket must be use within an SocketProvider");
  }

  return context;
};
