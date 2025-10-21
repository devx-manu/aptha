// backend/server.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

// CORS setup
app.use(
  cors({
    origin: ["https://aptha.vercel.app"],
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  })
);

// Body parser
app.use(express.json());

// API routes
app.use("/api/contact", require("./routes/contact"));
app.use("/api/users", require("./routes/users"));

// Health check
app.get("/", (req, res) => {
  res.send("✅ Aptha backend is running on Render!");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
