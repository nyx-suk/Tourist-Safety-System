// src/components/AlertCard.jsx

import React, { useState } from "react";
import { alertApi } from "../services/api";

const SEVERITY_CONFIG = {
  critical: { bg: "bg-red-50", border: "border-red-300", badge: "bg-red-600 text-white", dot: "bg-red-500", icon: "🚨" },
  high:     { bg: "bg-orange-50", border: "border-orange-300", badge: "bg-orange-500 text-white", dot: "bg-orange-500", icon: "⚠️" },
  medium:   { bg: "bg-amber-50", border: "border-amber-300", badge: "bg-amber-500 text-white", dot: "bg-amber-500", icon: "🔔" },
  low:      { bg: "bg-blue-50", border: "border-blue-200", badge: "bg-blue-500 text-white", dot: "bg-blue-400", icon: "ℹ️" },
};

export default function AlertCard({ alert, onUpdate }) {
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(null);
  const c = SEVERITY_CONFIG[alert.severity] || SEVERITY_CONFIG.low;

  const handleResolve = async () => {
    setLoading("resolve");
    try {
      await alertApi.resolve(alert.id);
      onUpdate && onUpdate();
    } catch {
      // fallback: optimistic update
    } finally {
      setLoading(null);
    }
  };

  const handleAssign = async () => {
    setLoading("assign");
    try {
      await alertApi.assign(alert.id, "Rapid Response Unit Alpha");
      onUpdate && onUpdate();
    } catch {
      // fallback
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className={`rounded-2xl border-2 ${c.bg} ${c.border} overflow-hidden`}>
      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4 flex-1">
            {/* Icon */}
            <div className="flex-shrink-0 w-11 h-11 bg-white rounded-xl flex items-center justify-center text-xl shadow-sm border border-white">
              {c.icon}
            </div>

            <div className="flex-1">
              {/* Badges row */}
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <span className={`text-xs font-black px-2.5 py-1 rounded-full ${c.badge}`}>
                  {alert.type.toUpperCase()}
                </span>
                <span className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                  <span className={`w-2 h-2 rounded-full animate-pulse ${c.dot}`} />
                  {alert.severity.toUpperCase()} SEVERITY
                </span>
                {alert.status && (
                  <span className="text-xs bg-white/70 border border-slate-200 text-slate-600 font-semibold px-2 py-0.5 rounded-full">
                    {alert.status}
                  </span>
                )}
              </div>

              <h3 className="font-black text-slate-900">{alert.tourist || alert.touristName}</h3>
              <div className="flex flex-wrap gap-4 mt-1.5">
                <span className="text-xs text-slate-500 flex items-center gap-1">🕐 {alert.time}</span>
                <span className="text-xs text-slate-500 flex items-center gap-1">📍 {alert.location}</span>
              </div>

              {/* Expanded panel */}
              {expanded && (
                <div className="mt-3 p-3 bg-white/60 rounded-xl border border-white/80">
                  <p className="text-sm text-slate-700">{alert.desc}</p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    <button
                      onClick={handleAssign}
                      disabled={loading === "assign" || alert.status === "Dispatched"}
                      className="bg-blue-600 disabled:opacity-50 text-white text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-1"
                    >
                      {loading === "assign" ? "⏳ Assigning..." : "🚔 Assign Unit"}
                    </button>
                    <button
                      onClick={handleResolve}
                      disabled={loading === "resolve" || alert.status === "Resolved"}
                      className="bg-emerald-600 disabled:opacity-50 text-white text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-1"
                    >
                      {loading === "resolve" ? "⏳ Resolving..." : "✅ Mark Resolved"}
                    </button>
                    <button className="bg-slate-200 text-slate-700 text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-slate-300 transition-colors">
                      📞 Contact Tourist
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <button
            onClick={() => setExpanded(!expanded)}
            className="bg-white border border-slate-200 text-slate-700 font-bold text-xs px-4 py-2 rounded-xl hover:bg-slate-50 transition-colors flex-shrink-0 shadow-sm"
          >
            {expanded ? "Collapse" : "View Details"}
          </button>
        </div>
      </div>
    </div>
  );
}
