import { Server } from "socket.io";
import http from "http";
import express from "express";
// import { User } from "../models/userModel";
const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST"],
  },
});

const userSocketmap = {}; //{userId,socketId}

export const getReciverSocketId = (receverId) => {
  return userSocketmap[receverId];
};

io.on("connection", async (socket) => {
  // console.log("Socket", socket);
  const userId = socket.handshake.query.userId;

  if (userId !== "undefined") {
    userSocketmap[userId] = socket.id;

    // const user = await User.findById(userId).select("-password");

    // console.log("User in Socket", user);
  }
  io.emit("getOnlineUsers", Object.keys(userSocketmap));

  socket.on("disconnect", () => {
    delete userSocketmap[userId],
      io.emit("getOnlineUsers", Object.keys(userSocketmap));
  });
});

export { app, io, server };
