import { io, Socket } from "socket.io-client";

const socket: Socket = io("http://localhost:5000", {
  autoConnect: false,
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
  reconnectionAttempts: 5,
});

export default socket;
