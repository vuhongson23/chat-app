const { createServer } = require("node:http");
const next = require("next");
const { Server } = require("socket.io");
const { parse } = require("node:url");

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 4000;

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      await handle(req, res, parsedUrl);
    } catch (error) {
      console.error("Error occurred handling", req.url, err);
      res.statusCode = 500;
      res.end("internal server error");
    }
  });

  const io = new Server(httpServer, {
    cors: {
      origin: ["http://localhost:3000"],
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  const onlineUsers = new Map();

  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    //User join
    socket.on("user_online", (userId) => {
      onlineUsers.set(userId, socket.id);

      socket.broadcast.emit("user_status_change", {
        userId,
        isOnline: true,
      });
    });

    //Send message
    socket.on("send_message", async (data) => {
      const { receiverId, senderId, content, messageId } = data;
      console.log("🚀 ~ data:", data);

      // Get receiver'socket
      const receiverSocketId = onlineUsers.get(receiverId);

      if (receiverSocketId) {
        // Send message to receiver
        io.to(receiverSocketId).emit("receive_message", {
          id: messageId,
          content,
          senderId,
          receiverId,
          createdAt: new Date().toISOString(),
          isRead: false,
        });
      }

      socket.emit("message_sented", { messageId });
    });

    socket.on("disconnect", () => {
      for (let [userId, socketId] of onlineUsers.entries()) {
        if (socketId === socket.id) {
          onlineUsers.delete(userId);
          socket.broadcast.emit("user_status_change", {
            userId,
            isOnline: false,
          });
        }
      }
      console.log(`User disconnected: ${socket.id}`);
    });
  });

  httpServer.listen(port, () => {
    console.log(`Server is running on http://${hostname}:${port}`);
  });
});
