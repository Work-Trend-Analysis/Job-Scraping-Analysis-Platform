const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.post("/profile", async (req, res) => {
  const { email, ...profileData } = req.body;
  try {
    const updatedUser = await User.findOneAndUpdate(
      { email },
      { $set: profileData },
      { new: true, upsert: true }
    );
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: "Failed to save profile" });
  }
});

router.get("/profile", async (req, res) => {
  const { email } = req.query;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch profile" });
  }
});

module.exports = router;
