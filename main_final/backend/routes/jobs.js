const express = require("express");
const router = express.Router();
const Job = require("../models/Job");

// GET /api/jobs/high-paying
router.get("/high-paying", async (req, res) => {
  try {
    const jobs = await Job.find({ salary: { $gte: 1500000 } }).sort({ salary: -1 }).limit(20);
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch jobs" });
  }
});

module.exports = router;
