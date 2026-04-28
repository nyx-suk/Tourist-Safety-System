// routes/stats.js

const express = require("express");
const { tourists, alerts } = require("../data/db");

const router = express.Router();

// GET /api/stats — Dashboard statistics
router.get("/", (_req, res) => {
  const activeTourists = tourists.filter((t) => t.status !== "Missing").length;
  const highRiskAlerts = alerts.filter((a) => (a.severity === "critical" || a.severity === "high") && a.status !== "Resolved").length;
  const panicRequests = alerts.filter((a) => a.type === "Panic Button Triggered").length;
  const missingTourists = tourists.filter((t) => t.status === "Missing").length;

  const statusBreakdown = tourists.reduce((acc, t) => {
    acc[t.status] = (acc[t.status] || 0) + 1;
    return acc;
  }, {});

  const alertSeverityBreakdown = alerts.reduce((acc, a) => {
    acc[a.severity] = (acc[a.severity] || 0) + 1;
    return acc;
  }, {});

  res.json({
    success: true,
    data: {
      activeTourists,
      highRiskAlerts,
      panicRequests,
      missingTourists,
      totalTourists: tourists.length,
      totalAlerts: alerts.length,
      statusBreakdown,
      alertSeverityBreakdown,
      lastUpdated: new Date().toISOString(),
    },
  });
});

module.exports = router;
