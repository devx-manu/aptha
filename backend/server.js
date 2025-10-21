// backend/server.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

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

// ✅ Handle preflight requests correctly for Express 5+
app.options("/*", cors());

// ✅ Body parsers
app.use(bodyParser.json());
app.use(express.json());

// ✅ Routes
const contactRouter = require("./routes/contact");
const usersRouter = require("./routes/users");

app.use("/api/contact", contactRouter);
app.use("/api/users", usersRouter);

// ✅ Root route (for Render health check)
app.get("/", (req, res) => {
  res.send("✅ Aptha backend is running on Render!");
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
