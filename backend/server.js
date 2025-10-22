// backend/server.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

// CORS setup
const allowedOrigins = [
  'https://aptha.vercel.app',
  'https://aptha-i9uat2lgq-dev-kannadigas-projects.vercel.app', // ← dev link
  'http://localhost:3000' // ← local testing
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'OPTIONS'],
  credentials: true
}));


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
