// server.js — Main Express Application

const express = require("express");
const cors = require("cors");
const touristRoutes = require("./routes/tourists");
const alertRoutes = require("./routes/alerts");
const statsRoutes = require("./routes/stats");

const app = express();
const PORT = process.env.PORT || 5000;

// ─── Middleware ────────────────────────────────────────────────────────────────
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Request logger
app.use((req, _res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// ─── Routes ───────────────────────────────────────────────────────────────────
app.use("/api/tourists", touristRoutes);
app.use("/api/alerts", alertRoutes);
app.use("/api/stats", statsRoutes);

// Health check
app.get("/api/health", (_req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString(), service: "SafeTour API v1.0" });
});

// 404 handler
app.use((_req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Global error handler
app.use((err, _req, res, _next) => {
  console.error("Server error:", err);
  res.status(500).json({ error: "Internal server error", message: err.message });
});

app.listen(PORT, () => {
  console.log(`\n🛡️  SafeTour API running on http://localhost:${PORT}`);
  console.log(`📡  Health: http://localhost:${PORT}/api/health\n`);
});
