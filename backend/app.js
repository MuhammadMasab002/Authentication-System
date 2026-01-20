import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./src/routes/auth.routes.js";
import userRouter from "./src/routes/user.routers.js";

const app = express();

const allowedOrigins = [
  "https://auth-system-frontend-five.vercel.app",
  process.env.FRONTEND_URL || "http://localhost:5173",
].filter(Boolean);

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());
// app.use(express.urlencoded({ extended: true }));

// API ROUTES
app.get("/", (req, res) => {
  res.send("Welcome to Backend API");
});

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

export default app;
