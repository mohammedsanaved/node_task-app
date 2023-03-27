import express from "express";
import mongoose from "mongoose";
import { config } from "dotenv";

config({
  path: "./data/config.env",
});

import UserRouter from "./routes/user.js";
import TaskRouter from "./routes/task.js";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";
import cors from "cors";

export const app = express();

const schema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

//Using Middleware
app.use(express.json());
app.use(cookieParser());
console.log(process.env.FRONTEND_URL);
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST", "DELETE", "PUT"],
    credential: true,
  })
);

// here UserRouter  is use
app.use("/api/v1/users", UserRouter);
app.use("/api/v1/task", TaskRouter);

app.get("/", (req, res) => {
  res.send("Home page");
});

app.use(errorMiddleware);
