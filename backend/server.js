// backend/server.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// Load environment variables and connect DB
dotenv.config();
connectDB();

const app = express();

// ✅ CORS configuration (must come before routes)
app.use(
  cors({
    origin: ["https://aptha.vercel.app"], // your deployed frontend URL
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  })
);

// ✅ Handle preflight requests globally
app.options("*", cors());

// ✅ Body parser (JSON)
app.use(bodyParser.json());
app.use(express.json()); // extra safety

// ✅ Routes
const contactRouter = require("./routes/contact");
const usersRouter = require("./routes/users");

app.use("/api/contact", contactRouter);
app.use("/api/users", usersRouter);

// ✅ Health check route (optional, useful for Render)
app.get("/", (req, res) => {
  res.send("Aptha backend is running successfully!");
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
