// routes/alerts.js

const express = require("express");
const { alerts } = require("../data/db");

const router = express.Router();

// GET /api/alerts — List all alerts
router.get("/", (req, res) => {
  const { severity, status, type } = req.query;
  let result = [...alerts];

  if (severity) result = result.filter((a) => a.severity === severity);
  if (status) result = result.filter((a) => a.status.toLowerCase() === status.toLowerCase());
  if (type) result = result.filter((a) => a.type.toLowerCase().includes(type.toLowerCase()));

  // Sort: critical first, then by date desc
  const severityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
  result.sort((a, b) => (severityOrder[a.severity] ?? 9) - (severityOrder[b.severity] ?? 9));

  res.json({ success: true, count: result.length, data: result });
});

// GET /api/alerts/:id — Get single alert
router.get("/:id", (req, res) => {
  const alert = alerts.find((a) => a.id === req.params.id);
  if (!alert) return res.status(404).json({ success: false, error: "Alert not found" });
  res.json({ success: true, data: alert });
});

// POST /api/alerts — Create a new alert
router.post("/", (req, res) => {
  const { type, touristId, tourist, location, severity, desc } = req.body;
  if (!type || !touristId || !tourist || !location || !severity) {
    return res.status(400).json({ success: false, error: "Missing required alert fields" });
  }

  const validSeverities = ["critical", "high", "medium", "low"];
  if (!validSeverities.includes(severity)) {
    return res.status(400).json({ success: false, error: `severity must be one of: ${validSeverities.join(", ")}` });
  }

  const now = new Date();
  const newAlert = {
    id: `ALT-${String(alerts.length + 6).padStart(3, "0")}`,
    type,
    touristId,
    tourist,
    time: now.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }),
    location,
    severity,
    status: "Active",
    desc: desc || "",
    createdAt: now.toISOString(),
  };

  alerts.unshift(newAlert);
  res.status(201).json({ success: true, message: "Alert created", data: newAlert });
});

// PUT /api/alerts/:id/resolve — Mark alert resolved
router.put("/:id/resolve", (req, res) => {
  const alert = alerts.find((a) => a.id === req.params.id);
  if (!alert) return res.status(404).json({ success: false, error: "Alert not found" });
  alert.status = "Resolved";
  alert.resolvedAt = new Date().toISOString();
  res.json({ success: true, message: "Alert resolved", data: alert });
});

// PUT /api/alerts/:id/assign — Assign a unit to an alert
router.put("/:id/assign", (req, res) => {
  const { unit } = req.body;
  const alert = alerts.find((a) => a.id === req.params.id);
  if (!alert) return res.status(404).json({ success: false, error: "Alert not found" });
  alert.status = "Dispatched";
  alert.assignedUnit = unit || "Nearest Available Unit";
  alert.assignedAt = new Date().toISOString();
  res.json({ success: true, message: "Unit assigned", data: alert });
});

module.exports = router;
