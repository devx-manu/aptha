// backend/server.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const path = require("path");

dotenv.config();
connectDB();

const app = express();

// ✅ CORS setup (frontend URL)
app.use(
  cors({
    origin: ["https://aptha.vercel.app"], // deployed frontend
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  })
);

// ✅ Body parser (built-in)
app.use(express.json());

// ✅ API routes
app.use("/api/contact", require("./routes/contact"));
app.use("/api/users", require("./routes/users"));

// ✅ Serve React frontend build
const frontendBuildPath = path.join(__dirname, "../frontend/build");
app.use(express.static(frontendBuildPath));

// ✅ SPA catch-all route for frontend
app.get("*", (req, res) => {
  res.sendFile(path.join(frontendBuildPath, "index.html"));
});

// ✅ Health check endpoint
app.get("/health", (req, res) => {
  res.send("✅ Aptha backend is running on Render!");
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
