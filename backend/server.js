// backend/server.js
const express = require("express");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

// ✅ Allowed origins (Vercel + localhost)
const allowedOrigins = [
  "https://aptha.vercel.app",
  "https://aptha-i9uat2lgq-dev-kannadigas-projects.vercel.app",
  "http://localhost:3000"
];

// ✅ CORS middleware
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", "true");

  // Respond to preflight requests
  if (req.method === "OPTIONS") {
    res.status(204).end();
    return;
  }

  next();
});

// ✅ Body parsers
app.use(bodyParser.json());
app.use(express.json());

// ✅ Routes
const contactRouter = require("./routes/contact");
const usersRouter = require("./routes/users");

app.use("/api/contact", contactRouter);
app.use("/api/users", usersRouter);

// ✅ Health check route
app.get("/", (req, res) => {
  res.send("✅ Aptha backend is running on Render!");
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
