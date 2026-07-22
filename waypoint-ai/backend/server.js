import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import geminiRoutes from "./routes/geminiRoutes.js";

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ extended: true }));

// Health Check
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Waypoint AI Backend Running 🚀",
  });
});

// API Routes
app.use("/api", geminiRoutes);

// 404
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not Found",
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err);

  res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Backend running at http://localhost:${PORT}`);
});