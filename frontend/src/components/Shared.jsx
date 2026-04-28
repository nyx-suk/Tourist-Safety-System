// src/components/Shared.jsx — Reusable UI primitives

import React from "react";

export const Skeleton = ({ className }) => (
  <div className={`animate-pulse bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 rounded-lg ${className}`} />
);

export const Badge = ({ status }) => {
  const map = {
    Safe: "bg-emerald-100 text-emerald-700 border-emerald-200",
    Caution: "bg-amber-100 text-amber-700 border-amber-200",
    "High Risk": "bg-red-100 text-red-700 border-red-200",
    Missing: "bg-purple-100 text-purple-700 border-purple-200",
    Active: "bg-orange-100 text-orange-700 border-orange-200",
    Resolved: "bg-emerald-100 text-emerald-700 border-emerald-200",
    Dispatched: "bg-blue-100 text-blue-700 border-blue-200",
    "Missing Filed": "bg-purple-100 text-purple-700 border-purple-200",
  };
  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${map[status] || "bg-gray-100 text-gray-600 border-gray-200"}`}>
      {status}
    </span>
  );
};

export const ScoreBar = ({ score }) => {
  const color = score >= 80 ? "bg-emerald-500" : score >= 50 ? "bg-amber-500" : "bg-red-500";
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 bg-slate-100 rounded-full h-1.5 overflow-hidden">
        <div className={`h-full rounded-full transition-all duration-700 ${color}`} style={{ width: `${score}%` }} />
      </div>
      <span className="text-xs font-mono font-bold text-slate-600 w-6">{score}</span>
    </div>
  );
};

export const SectionHeader = ({ eyebrow, title, subtitle, eyebrowColor = "text-blue-600" }) => (
  <div className="text-center mb-14">
    {eyebrow && <span className={`font-bold text-sm uppercase tracking-widest ${eyebrowColor}`}>{eyebrow}</span>}
    <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-2">{title}</h2>
    {subtitle && <p className="text-slate-500 mt-3 max-w-xl mx-auto">{subtitle}</p>}
  </div>
);

export const StatCard = ({ label, value, icon, color, change }) => {
  const colors = {
    blue: "from-blue-500 to-blue-700 shadow-blue-200",
    amber: "from-amber-500 to-orange-600 shadow-amber-200",
    red: "from-red-500 to-red-700 shadow-red-200",
    purple: "from-purple-500 to-purple-700 shadow-purple-200",
  };
  return (
    <div className={`bg-gradient-to-br ${colors[color] || colors.blue} rounded-2xl p-5 text-white shadow-lg`}>
      <div className="flex justify-between items-start mb-3">
        <span className="text-2xl">{icon}</span>
        <span className="text-xs bg-white/20 px-2 py-1 rounded-full font-semibold">{change}</span>
      </div>
      <p className="text-3xl font-black">{value}</p>
      <p className="text-white/70 text-xs font-semibold mt-1">{label}</p>
    </div>
  );
};

export const ErrorBanner = ({ message }) => (
  <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 text-sm font-semibold flex items-center gap-2">
    <span>⚠️</span> {message}
  </div>
);

export const LoadingSpinner = ({ label = "Loading..." }) => (
  <div className="flex flex-col items-center justify-center py-16 gap-3">
    <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />
    <p className="text-slate-500 text-sm font-semibold">{label}</p>
  </div>
);
