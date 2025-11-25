// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(cors());
app.use(express.json());



// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

// Basic route for testing
app.get("/", (req, res) => {
  res.send("CareerLens backend server is running");
});

// Import auth routes (we'll create next)
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

const jobsRoutes = require("./routes/jobs");
app.use("/api/jobs", jobsRoutes);

const userRoutes = require("./routes/user");
app.use("/api/user", userRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
