const express = require("express");
const router = express.Router();
const Job = require("../models/Job");
const User = require("../models/User");

const ML_SERVICE_URL = process.env.ML_SERVICE_URL || "http://localhost:9000";
const ML_REQUEST_TIMEOUT_MS = Number(process.env.ML_REQUEST_TIMEOUT_MS || 12000);
const ML_MAX_RETRIES = Number(process.env.ML_MAX_RETRIES || 1);

function buildUserText(user) {
  const skills = Array.isArray(user.skills) ? user.skills.join(", ") : "";
  const certifications = Array.isArray(user.certifications)
    ? user.certifications.join(", ")
    : "";

  const parts = [
    `Current role: ${user.currentRole || ""}`,
    `Experience: ${user.experience || ""}`,
    `Skills: ${skills}`,
    `Bio: ${user.bio || ""}`,
    `Course: ${user.course || ""}`,
    `Industry preference: ${user.currentCompany || ""}`,
    `Certifications: ${certifications}`,
  ];

  return parts.join(". ").trim();
}

function formatSalary(value) {
  const numeric = Number(value);
  if (!Number.isFinite(numeric) || numeric <= 0) return "Not disclosed";
  return `INR ${numeric.toLocaleString("en-IN")}`;
}

function mapMlResultsToJobs(results) {
  return results.map((item, index) => {
    const job = item.job || {};
    const score = Number(item.score) || 0;
    return {
      id: job.job_id ?? index,
      title: job.job_title || "Untitled Role",
      company: job.company_name || "Unknown Company",
      location: job.location || "Unknown Location",
      type: job.employment_type || "Unknown",
      experience: job.seniority_level || "Unknown",
      salary: formatSalary(job.salary),
      matchScore: Math.max(0, Math.min(100, Math.round(score * 100))),
      requiredSkills: [],
      matchingSkills: [],
      missingSkills: [],
      description: `${job.job_function || "General"} role in ${job.industry || "Unknown Industry"}.`,
      benefits: [],
      posted: job.date || "Unknown",
      applicants: 0,
      companyRating: 0,
    };
  });
}

async function callMlMatchJobs(userText, topK, options = {}) {
  const attempts = Math.max(1, ML_MAX_RETRIES + 1);
  let lastError = null;

  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), ML_REQUEST_TIMEOUT_MS);

    try {
      const mlResponse = await fetch(`${ML_SERVICE_URL}/match-jobs`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_text: String(userText),
          top_k: Number(topK) || 20,
          rerank: Boolean(options.rerank),
          rerank_top_n: Number(options.rerankTopN) || 50,
        }),
        signal: controller.signal,
      });
      clearTimeout(timeout);

      if (!mlResponse.ok) {
        const details = await mlResponse.text();
        throw new Error(`ML_HTTP_${mlResponse.status}:${details}`);
      }

      const mlPayload = await mlResponse.json();
      return Array.isArray(mlPayload.results) ? mlPayload.results : [];
    } catch (err) {
      clearTimeout(timeout);
      lastError = err;
      if (attempt < attempts) {
        continue;
      }
    }
  }

  throw lastError || new Error("ML service unavailable");
}

function sendMlRouteError(res, err, fallbackMessage) {
  if (err && err.name === "AbortError") {
    return res.status(504).json({ error: "ML service timeout", details: "Request to ML service timed out" });
  }

  if (err && typeof err.message === "string" && err.message.startsWith("ML_HTTP_")) {
    const details = err.message.split(":").slice(1).join(":");
    return res.status(502).json({ error: "ML service failed", details });
  }

  return res.status(500).json({ error: fallbackMessage, details: err?.message || "Unknown error" });
}

// GET /api/jobs/high-paying
router.get("/high-paying", async (req, res) => {
  try {
    const jobs = await Job.find({ salary: { $gte: 1500000 } }).sort({ salary: -1 }).limit(20);
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch jobs" });
  }
});

// GET /api/jobs/match?email=...
router.get("/match", async (req, res) => {
  try {
    const { email, topK, rerank, rerankTopN } = req.query;
    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    const user = await User.findOne({ email }).lean();
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const userText = buildUserText(user);
    if (!userText || userText.length < 5) {
      return res.status(400).json({ error: "User profile is incomplete for matching" });
    }

    const results = await callMlMatchJobs(userText, topK, {
      rerank: rerank === "true",
      rerankTopN,
    });
    const formatted = mapMlResultsToJobs(results);

    res.json({ jobs: formatted });
  } catch (err) {
    sendMlRouteError(res, err, "Failed to fetch matched jobs");
  }
});

// POST /api/jobs/match-direct
router.post("/match-direct", async (req, res) => {
  try {
    const { user_text, top_k, rerank, rerank_top_n } = req.body || {};
    if (!user_text || String(user_text).trim().length < 5) {
      return res.status(400).json({ error: "user_text is required" });
    }

    const results = await callMlMatchJobs(user_text, top_k, {
      rerank,
      rerankTopN: rerank_top_n,
    });
    const jobs = mapMlResultsToJobs(results);

    res.json({ jobs });
  } catch (err) {
    sendMlRouteError(res, err, "Failed to fetch direct matches");
  }
});

module.exports = router;
