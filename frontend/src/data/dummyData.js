// src/data/dummyData.js — Fallback data when API is unavailable

export const TOURISTS = [
  { id: "TID-2024-0891", fullName: "Arjun Mehta", passport: "P1234567", location: "Marina Beach, Chennai", safetyScore: 92, status: "Safe", nationality: "Indian", lastSeen: "2 min ago" },
  { id: "TID-2024-0892", fullName: "Sophie Laurent", passport: "FR9876543", location: "Mahabalipuram Shore Temple", safetyScore: 78, status: "Caution", nationality: "French", lastSeen: "8 min ago" },
  { id: "TID-2024-0893", fullName: "Kenji Tanaka", passport: "JP5544332", location: "Ooty Lake", safetyScore: 45, status: "High Risk", nationality: "Japanese", lastSeen: "34 min ago" },
  { id: "TID-2024-0894", fullName: "Priya Nair", passport: "K7654321", location: "Meenakshi Temple, Madurai", safetyScore: 95, status: "Safe", nationality: "Indian", lastSeen: "1 min ago" },
  { id: "TID-2024-0895", fullName: "David Okonkwo", passport: "NG2233445", location: "Kodaikanal Lake", safetyScore: 61, status: "Caution", nationality: "Nigerian", lastSeen: "15 min ago" },
  { id: "TID-2024-0896", fullName: "Emma Wilson", passport: "GB1122334", location: "Unknown", safetyScore: 12, status: "Missing", nationality: "British", lastSeen: "3 hrs ago" },
];

export const ALERTS = [
  { id: "ALT-001", type: "Geo-fence Violation", tourist: "Kenji Tanaka", time: "10:34 AM", location: "Restricted Zone, Nilgiris", severity: "high", status: "Active", desc: "Tourist has entered a restricted forest area beyond permitted boundary." },
  { id: "ALT-002", type: "Panic Button Triggered", tourist: "Sophie Laurent", time: "09:12 AM", location: "ECR Highway, Chennai", severity: "critical", status: "Dispatched", desc: "SOS activated. Emergency contacts notified. Nearest unit dispatched." },
  { id: "ALT-003", type: "Inactivity Detected", tourist: "David Okonkwo", time: "08:55 AM", location: "Kodaikanal Lake", severity: "medium", status: "Active", desc: "No GPS or app activity for over 45 minutes in a remote area." },
  { id: "ALT-004", type: "Geo-fence Violation", tourist: "Emma Wilson", time: "07:30 AM", location: "Unknown Sector", severity: "critical", status: "Missing Filed", desc: "Tourist last pinged outside safe zone. Signal lost. Missing report filed." },
  { id: "ALT-005", type: "Inactivity Detected", tourist: "Arjun Mehta", time: "11:02 AM", location: "Marina Beach", severity: "low", status: "Resolved", desc: "Brief inactivity window detected. Tourist confirmed safe via callback." },
];

export const STATS = {
  activeTourists: 1247,
  highRiskAlerts: 8,
  panicRequests: 3,
  missingTourists: 1,
};

export const FEATURES = [
  { icon: "🔗", title: "Blockchain Digital ID", desc: "Tamper-proof digital identity for every registered tourist, secured on distributed ledger technology." },
  { icon: "📍", title: "Geo-fencing Alerts", desc: "Real-time perimeter monitoring alerts authorities when tourists enter restricted or high-risk zones." },
  { icon: "🆘", title: "One-Touch Panic Button", desc: "Instant distress signal with GPS coordinates sent to nearest emergency response unit in under 10 seconds." },
  { icon: "🤖", title: "AI Safety Monitoring", desc: "Machine learning models analyze movement patterns, inactivity, and anomalies to predict risk proactively." },
];
