import express from "express";
import cors from "cors";
import authRouter from "./src/routes/auth.routes.js";

const app = express();

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5173",
  process.env.FRONTEND_URL || "http://localhost:3000",
].filter(Boolean);

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// API ROUTES
app.get("/", (req, res) => {
  res.send("Welcome to Backend API");
});

app.use("/api/auth", authRouter);

export default app;
