import express from "express";
import cors from "cors";
import authRouter from "./src/routes/auth.routes.js";

const app = express();

app.use(cors());
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// API ROUTES
app.get("/", (req, res) => {
  res.send("Welcome to Backend API");
});

app.use("/api/auth", authRouter);

export default app;
