"use client";
import { io } from "socket.io-client";

// Kết nối tới server Socket.IO trên port 4000
export const socket = io("http://localhost:4000", {
  transports: ["websocket", "polling"], // tránh lỗi fallback polling
});
