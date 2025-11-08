import express from "express";
import router from "./routes/routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";

import { app, server } from "./socket/socket.js";

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/image", router);
app.use("/api/delete", router);
app.use("/api/auth", router);
app.use("/api/message", router);
app.use("/api/user", router);
app.use("/api/video", router);
app.use("/api/doc", router);
app.use("/api/download", router);
app.use("/api/change", router);

app.get("/", (req, res) => {
  res.send("Server is working");
});
app.get("/protected", (req, res) => {
  console.log(req.cookies); // { jwt: 'eyJhbGciOiJIUzI1...' }

  const token = req.cookies.jwt;
  if (!token) return res.status(401).send("Unauthorized");

  // Continue verifying token...
});

export { app, server };
