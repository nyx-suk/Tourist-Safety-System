// src/pages/DashboardPage.jsx

import React, { useState, useEffect, useCallback } from "react";
import { touristApi, statsApi } from "../services/api";
import { Skeleton, Badge, ScoreBar, StatCard, LoadingSpinner } from "../components/Shared";
import AlertCard from "../components/AlertCard";
import { TOURISTS, STATS, ALERTS } from "../data/dummyData";
import { alertApi } from "../services/api";

const NAV_ITEMS = [
  { id: "tourists", icon: "👥", label: "Tourist List" },
  { id: "alerts", icon: "⚠️", label: "Alerts", badge: 8 },
  { id: "heatmap", icon: "🗺️", label: "Heatmap" },
  { id: "missing", icon: "🔍", label: "Missing Reports", badge: 1 },
];

export default function DashboardPage({ setPage }) {
  const [activeTab, setActiveTab] = useState("tourists");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [tourists, setTourists] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [tRes, aRes, sRes] = await Promise.all([touristApi.getAll(), alertApi.getAll(), statsApi.get()]);
      setTourists(tRes.data);
      setAlerts(aRes.data);
      setStats(sRes.data);
    } catch {
      // Fallback to dummy data
      setTourists(TOURISTS.map(t => ({ ...t, fullName: t.fullName, safetyScore: t.safetyScore })));
      setAlerts(ALERTS);
      setStats(STATS);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const filteredTourists = tourists.filter(t => {
    const q = search.toLowerCase();
    return !q || (t.fullName || t.name || "").toLowerCase().includes(q) || (t.id || "").toLowerCase().includes(q);
  });

  const statCards = stats ? [
    { label: "Active Tourists", value: stats.activeTourists?.toLocaleString() || "1,247", icon: "👥", color: "blue", change: "+12 today" },
    { label: "High Risk Alerts", value: stats.highRiskAlerts || "8", icon: "⚠️", color: "amber", change: "3 new" },
    { label: "Panic Requests", value: stats.panicRequests || "3", icon: "🚨", color: "red", change: "2 resolved" },
    { label: "Missing Tourists", value: stats.missingTourists || "1", icon: "🔍", color: "purple", change: "Since 07:30" },
  ] : [];

  const Sidebar = () => (
    <aside className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-gradient-to-b from-slate-900 to-slate-800 text-white flex flex-col transform transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}>
      <div className="p-6 border-b border-slate-700">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center text-lg">🏛️</div>
          <div>
            <p className="font-black text-sm">Authority Panel</p>
            <p className="text-slate-400 text-xs">Control Room</p>
          </div>
        </div>
      </div>
      <nav className="p-4 flex-1 space-y-1">
        {NAV_ITEMS.map(item => (
          <button key={item.id} onClick={() => { setActiveTab(item.id); setSidebarOpen(false); }}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all ${activeTab === item.id ? "bg-blue-600 text-white shadow-lg shadow-blue-900" : "text-slate-300 hover:bg-slate-700/60"}`}>
            <span className="flex items-center gap-3"><span className="text-base">{item.icon}</span>{item.label}</span>
            {item.badge && (
              <span className={`text-xs font-black px-2 py-0.5 rounded-full ${activeTab === item.id ? "bg-white text-blue-600" : "bg-red-500 text-white"}`}>{item.badge}</span>
            )}
          </button>
        ))}
      </nav>
      <div className="p-4 border-t border-slate-700">
        <div className="flex items-center gap-3 px-4 py-3">
          <div className="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center text-sm font-bold">SK</div>
          <div>
            <p className="text-sm font-semibold">Suresh Kumar</p>
            <p className="text-slate-400 text-xs flex items-center gap-1"><span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />Online</p>
          </div>
        </div>
      </div>
    </aside>
  );

  return (
    <div className="min-h-screen bg-slate-100 flex">
      <Sidebar />
      {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      <main className="flex-1 overflow-auto min-w-0">
        {/* Top bar */}
        <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-20 shadow-sm">
          <div className="flex items-center gap-4">
            <button className="lg:hidden p-2 rounded-lg hover:bg-slate-100" onClick={() => setSidebarOpen(true)}>
              <div className="w-5 h-0.5 bg-slate-700 mb-1 rounded" />
              <div className="w-5 h-0.5 bg-slate-700 mb-1 rounded" />
              <div className="w-5 h-0.5 bg-slate-700 rounded" />
            </button>
            <div>
              <h1 className="font-black text-slate-900">{NAV_ITEMS.find(n => n.id === activeTab)?.icon} {NAV_ITEMS.find(n => n.id === activeTab)?.label}</h1>
              <p className="text-slate-400 text-xs">{new Date().toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-2 rounded-lg hover:bg-slate-100">
              <span className="text-xl">🔔</span>
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white" />
            </button>
            <button onClick={() => setPage("alerts")} className="hidden sm:flex bg-red-50 text-red-600 border border-red-200 font-semibold text-sm px-4 py-2 rounded-lg hover:bg-red-100 transition-colors items-center gap-2">
              <span>🚨</span> View Alerts
            </button>
            <button onClick={fetchData} className="bg-slate-100 text-slate-600 font-semibold text-sm px-3 py-2 rounded-lg hover:bg-slate-200 transition-colors">↻ Refresh</button>
          </div>
        </header>

        <div className="p-6">
          {/* Stats row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {loading
              ? [...Array(4)].map((_, i) => <Skeleton key={i} className="h-28 rounded-2xl" />)
              : statCards.map(s => <StatCard key={s.label} {...s} />)
            }
          </div>

          {/* Tab content */}
          {activeTab === "tourists" && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-slate-100 flex items-center justify-between flex-wrap gap-3">
                <h2 className="font-black text-slate-900">Registered Tourists</h2>
                <div className="flex items-center gap-3">
                  <input
                    type="text" value={search} onChange={e => setSearch(e.target.value)}
                    placeholder="🔍  Search tourists..."
                    className="border border-slate-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-48"
                  />
                  <button onClick={() => setPage("register")} className="bg-blue-600 text-white text-sm font-bold px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors">+ Add</button>
                </div>
              </div>
              <div className="overflow-x-auto">
                {loading ? (
                  <div className="p-5 space-y-3">{[...Array(5)].map((_, i) => <Skeleton key={i} className="h-14 rounded-xl" />)}</div>
                ) : (
                  <table className="w-full">
                    <thead>
                      <tr className="bg-slate-50 text-xs font-bold text-slate-400 uppercase tracking-widest">
                        {["Tourist ID","Name","Nationality","Last Known Location","Safety Score","Status","Last Seen","Action"].map(h => (
                          <th key={h} className="text-left px-5 py-3.5 whitespace-nowrap">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {filteredTourists.map((t, i) => (
                        <tr key={t.id} className={`border-t border-slate-100 hover:bg-slate-50 transition-colors ${i % 2 === 0 ? "" : "bg-slate-50/30"}`}>
                          <td className="px-5 py-4 font-mono text-xs text-blue-600 font-bold whitespace-nowrap">{t.id}</td>
                          <td className="px-5 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center text-xs font-black text-blue-700 flex-shrink-0">
                                {(t.fullName || t.name || "").split(" ").map(n => n[0]).join("").slice(0, 2)}
                              </div>
                              <span className="font-semibold text-sm text-slate-900 whitespace-nowrap">{t.fullName || t.name}</span>
                            </div>
                          </td>
                          <td className="px-5 py-4 text-sm text-slate-500">{t.nationality}</td>
                          <td className="px-5 py-4 text-sm text-slate-600 max-w-[200px]">
                            <div className="flex items-center gap-1.5">
                              <span className="text-xs flex-shrink-0">📍</span>
                              <span className="truncate">{t.location}</span>
                            </div>
                          </td>
                          <td className="px-5 py-4 w-36"><ScoreBar score={t.safetyScore || t.score} /></td>
                          <td className="px-5 py-4"><Badge status={t.status} /></td>
                          <td className="px-5 py-4 text-xs text-slate-400 font-medium whitespace-nowrap">
                            {t.lastSeen ? (typeof t.lastSeen === "string" && t.lastSeen.includes("ago") ? t.lastSeen : new Date(t.lastSeen).toLocaleTimeString()) : "—"}
                          </td>
                          <td className="px-5 py-4">
                            <button className="text-blue-600 hover:text-blue-800 text-xs font-bold hover:underline">View →</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
              <div className="px-5 py-3 border-t border-slate-100 text-xs text-slate-400 font-medium">
                Showing {filteredTourists.length} of {tourists.length} tourists
              </div>
            </div>
          )}

          {activeTab === "alerts" && (
            <div className="space-y-4">
              {loading ? <LoadingSpinner label="Fetching alerts..." /> : alerts.slice(0, 5).map(alert => (
                <AlertCard key={alert.id} alert={alert} onUpdate={fetchData} />
              ))}
              <button onClick={() => setPage("alerts")} className="w-full text-center text-blue-600 font-bold text-sm py-3 hover:underline">
                View all alerts →
              </button>
            </div>
          )}

          {activeTab === "heatmap" && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
              <h2 className="font-black text-slate-900 mb-2">Tourist Activity Heatmap</h2>
              <p className="text-slate-400 text-sm mb-5">Live density overlay — Tamil Nadu & surroundings</p>
              <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl h-96 overflow-hidden">
                <div className="absolute inset-0">
                  {[
                    { x: 30, y: 40, r: 80, c: "#ef4444" }, { x: 60, y: 55, r: 60, c: "#f97316" },
                    { x: 50, y: 70, r: 50, c: "#eab308" }, { x: 20, y: 65, r: 40, c: "#f97316" },
                    { x: 75, y: 35, r: 35, c: "#eab308" }, { x: 40, y: 25, r: 25, c: "#22c55e" },
                  ].map((h, i) => (
                    <div key={i} className="absolute rounded-full blur-2xl opacity-40"
                      style={{ left: `${h.x}%`, top: `${h.y}%`, width: h.r * 2, height: h.r * 2, background: `radial-gradient(circle, ${h.c}, transparent)`, transform: "translate(-50%,-50%)" }} />
                  ))}
                </div>
                <div className="relative flex flex-col items-center justify-center h-full text-center">
                  <p className="text-white text-xl font-bold mb-2">🗺️ Live Density Map</p>
                  <p className="text-slate-400 text-sm mb-4">Tourist cluster visualization across monitored zones</p>
                  <div className="flex items-center justify-center gap-6">
                    {[["🔴","High Density"],["🟠","Medium"],["🟡","Low"],["🟢","Clear"]].map(([d,l]) => (
                      <div key={l} className="flex items-center gap-1.5 text-xs text-slate-300"><span>{d}</span><span>{l}</span></div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-4">
                {[["Marina Beach, Chennai","347 active","High"],["Mahabalipuram","89 active","Medium"],["Ooty & Nilgiris","212 active","High"]].map(([loc, count, risk]) => (
                  <div key={loc} className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                    <p className="font-semibold text-slate-900 text-sm">{loc}</p>
                    <p className="text-blue-600 font-black mt-1">{count}</p>
                    <Badge status={risk === "High" ? "High Risk" : "Caution"} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "missing" && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-black text-slate-900">🔍 Missing Tourist Reports</h2>
                <span className="bg-red-100 text-red-700 font-bold text-xs px-3 py-1.5 rounded-full">1 Active Case</span>
              </div>
              <div className="border-2 border-red-200 bg-red-50 rounded-2xl p-5 mb-4">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 bg-red-200 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">👤</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1 flex-wrap">
                      <h3 className="font-black text-red-900 text-lg">Emma Wilson</h3>
                      <span className="bg-red-600 text-white text-xs font-bold px-2.5 py-1 rounded-full">MISSING</span>
                    </div>
                    <p className="text-red-600 text-sm font-semibold">TID-2024-0896 · British Citizen · Passport: GB1122334</p>
                    <p className="text-red-500 text-sm mt-2">Last known: Unknown Sector · Signal lost at <strong>07:30 AM</strong></p>
                    <div className="flex flex-wrap gap-3 mt-4">
                      <button className="bg-red-600 text-white text-sm font-bold px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">🚨 Escalate to Police</button>
                      <button className="bg-white border border-red-300 text-red-600 text-sm font-bold px-4 py-2 rounded-lg hover:bg-red-50 transition-colors">📋 Full Report</button>
                      <button className="bg-white border border-slate-300 text-slate-700 text-sm font-bold px-4 py-2 rounded-lg hover:bg-slate-50 transition-colors">📞 Contact Embassy</button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
                <p className="text-slate-500 text-sm text-center">No other missing tourist cases at this time.</p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
