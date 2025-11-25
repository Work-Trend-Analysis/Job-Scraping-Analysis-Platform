const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema({
  job_title: { type: String, required: true },
  company_name: String,
  location: String,
  hiring_status: String,
  date: Date,
  seniority_level: String,
  job_function: String,
  employment_type: String,
  industry: String,
  salary: Number,
  skills: [String],
});

module.exports = mongoose.model("Job", JobSchema);
