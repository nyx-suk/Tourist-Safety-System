// src/pages/AlertsPage.jsx

import React, { useState, useEffect, useCallback } from "react";
import { alertApi } from "../services/api";
import AlertCard from "../components/AlertCard";
import { LoadingSpinner } from "../components/Shared";
import { ALERTS } from "../data/dummyData";

const FILTERS = [
  ["all", "All Alerts"],
  ["critical", "Critical"],
  ["high", "High Risk"],
  ["medium", "Medium"],
  ["low", "Low"],
  ["geo", "Geo-fence"],
  ["panic", "Panic"],
  ["inactivity", "Inactivity"],
];

export default function AlertsPage() {
  const [alerts, setAlerts] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  const fetchAlerts = useCallback(async () => {
    try {
      const res = await alertApi.getAll();
      setAlerts(res.data);
    } catch {
      setAlerts(ALERTS);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchAlerts(); }, [fetchAlerts]);

  const filtered = filter === "all"
    ? alerts
    : alerts.filter(a => a.severity === filter || a.type.toLowerCase().includes(filter));

  const countBySeverity = (sev) => alerts.filter(a => a.severity === sev).length;

  const summaryCards = [
    { label: "Critical", count: countBySeverity("critical"), color: "bg-red-600" },
    { label: "High",     count: countBySeverity("high"),     color: "bg-orange-500" },
    { label: "Medium",   count: countBySeverity("medium"),   color: "bg-amber-500" },
    { label: "Low",      count: countBySeverity("low"),      color: "bg-blue-500" },
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex items-start justify-between flex-wrap gap-4">
          <div>
            <span className="text-red-600 font-bold text-sm uppercase tracking-widest">Live Alerts</span>
            <h1 className="text-3xl font-black text-slate-900 mt-2">Incident Response Center</h1>
            <p className="text-slate-500 mt-2">Real-time alerts from field monitoring. Respond promptly to all critical incidents.</p>
          </div>
          <button onClick={fetchAlerts} className="bg-white border border-slate-200 text-slate-600 font-semibold text-sm px-4 py-2 rounded-xl hover:bg-slate-50 shadow-sm flex items-center gap-2">
            ↻ Refresh
          </button>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {summaryCards.map(s => (
            <div key={s.label} className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm text-center">
              <div className={`text-2xl font-black text-white w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-2 ${s.color}`}>
                {s.count}
              </div>
              <p className="text-sm font-bold text-slate-600">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Filter strip */}
        <div className="flex flex-wrap gap-2 mb-6">
          {FILTERS.map(([v, l]) => (
            <button
              key={v}
              onClick={() => setFilter(v)}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all border ${
                filter === v
                  ? "bg-blue-600 text-white border-blue-600 shadow-md"
                  : "bg-white text-slate-600 border-slate-200 hover:border-blue-300"
              }`}
            >
              {l}
              {v !== "all" && <span className="ml-1.5 text-xs opacity-70">
                ({v === "geo" ? alerts.filter(a => a.type.toLowerCase().includes("geo")).length
                  : v === "panic" ? alerts.filter(a => a.type.toLowerCase().includes("panic")).length
                  : v === "inactivity" ? alerts.filter(a => a.type.toLowerCase().includes("inactivity")).length
                  : alerts.filter(a => a.severity === v).length})
              </span>}
            </button>
          ))}
        </div>

        {/* Alert list */}
        {loading ? (
          <LoadingSpinner label="Loading incident reports..." />
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 text-slate-400">
            <div className="text-5xl mb-3">✅</div>
            <p className="font-bold text-lg">No alerts matching filter</p>
            <p className="text-sm mt-1">All incidents for this category are resolved.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map(alert => (
              <AlertCard key={alert.id} alert={alert} onUpdate={fetchAlerts} />
            ))}
          </div>
        )}

        {/* Legend */}
        <div className="mt-8 bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
          <p className="font-bold text-slate-700 text-sm mb-3">Alert Type Legend</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { icon: "📍", title: "Geo-fence Violation", desc: "Tourist has crossed a monitored boundary into a restricted or high-risk area." },
              { icon: "🆘", title: "Panic Button Triggered", desc: "Tourist manually activated the SOS button. Immediate response required." },
              { icon: "📵", title: "Inactivity Detected", desc: "No GPS or app activity for an extended period in a remote location." },
            ].map(l => (
              <div key={l.title} className="flex gap-3">
                <span className="text-xl flex-shrink-0">{l.icon}</span>
                <div>
                  <p className="font-bold text-slate-800 text-sm">{l.title}</p>
                  <p className="text-slate-500 text-xs mt-0.5 leading-relaxed">{l.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
