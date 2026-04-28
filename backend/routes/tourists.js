// routes/tourists.js

const express = require("express");
const { v4: uuidv4 } = require("uuid");
const { tourists } = require("../data/db");

const router = express.Router();

// GET /api/tourists — List all tourists
router.get("/", (req, res) => {
  const { status, nationality, search } = req.query;
  let result = [...tourists];

  if (status) result = result.filter((t) => t.status.toLowerCase() === status.toLowerCase());
  if (nationality) result = result.filter((t) => t.nationality.toLowerCase() === nationality.toLowerCase());
  if (search) {
    const q = search.toLowerCase();
    result = result.filter(
      (t) =>
        t.fullName.toLowerCase().includes(q) ||
        t.id.toLowerCase().includes(q) ||
        t.passport.toLowerCase().includes(q)
    );
  }

  res.json({ success: true, count: result.length, data: result });
});

// GET /api/tourists/:id — Get single tourist
router.get("/:id", (req, res) => {
  const tourist = tourists.find((t) => t.id === req.params.id);
  if (!tourist) return res.status(404).json({ success: false, error: "Tourist not found" });
  res.json({ success: true, data: tourist });
});

// POST /api/tourists/register — Register a new tourist
router.post("/register", (req, res) => {
  const { fullName, passport, nationality, startDate, endDate, itinerary, emergencyName, emergencyPhone } = req.body;

  // Validation
  const required = { fullName, passport, nationality, startDate, endDate, emergencyName, emergencyPhone };
  const missing = Object.entries(required)
    .filter(([, v]) => !v)
    .map(([k]) => k);
  if (missing.length > 0) {
    return res.status(400).json({ success: false, error: "Missing required fields", fields: missing });
  }

  // Check duplicate passport
  if (tourists.find((t) => t.passport === passport)) {
    return res.status(409).json({ success: false, error: "Tourist with this passport/Aadhaar already registered" });
  }

  const serial = String(tourists.length + 897).padStart(4, "0");
  const newTourist = {
    id: `TID-2024-${serial}`,
    fullName,
    passport,
    nationality,
    startDate,
    endDate,
    itinerary: itinerary || "",
    emergencyName,
    emergencyPhone,
    location: "Not yet active",
    safetyScore: 100,
    status: "Safe",
    lastSeen: new Date().toISOString(),
    registeredAt: new Date().toISOString(),
  };

  tourists.push(newTourist);
  res.status(201).json({ success: true, message: "Tourist registered successfully", data: newTourist });
});

// PUT /api/tourists/:id/status — Update tourist status
router.put("/:id/status", (req, res) => {
  const { status, location, safetyScore } = req.body;
  const tourist = tourists.find((t) => t.id === req.params.id);
  if (!tourist) return res.status(404).json({ success: false, error: "Tourist not found" });

  if (status) tourist.status = status;
  if (location) tourist.location = location;
  if (safetyScore !== undefined) tourist.safetyScore = safetyScore;
  tourist.lastSeen = new Date().toISOString();

  res.json({ success: true, message: "Tourist updated", data: tourist });
});

// DELETE /api/tourists/:id — Remove tourist
router.delete("/:id", (req, res) => {
  const idx = tourists.findIndex((t) => t.id === req.params.id);
  if (idx === -1) return res.status(404).json({ success: false, error: "Tourist not found" });
  tourists.splice(idx, 1);
  res.json({ success: true, message: "Tourist record removed" });
});

module.exports = router;
