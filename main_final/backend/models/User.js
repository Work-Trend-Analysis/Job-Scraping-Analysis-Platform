const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },       // Basic info
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },

  // Profile fields
  fullName: String,
  username: String,
  phone: String,
  linkedinId: String,
  currentLocation: String,
  dateOfBirth: String,
  bio: String,
  college: String,
  course: String,
  graduationYear: String,
  currentCompany: String,
  currentRole: String,
  experience: String,
  skills: [String],
  certifications: [String],
  projects: [{ name: String, description: String, link: String }],
  profilePicture: String,   // You can store base64 or image URL here
  resumeUrl: String         // For resume upload if needed
});

module.exports = mongoose.model("User", UserSchema);
