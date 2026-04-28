// src/components/NavBar.jsx

import React, { useState } from "react";

const NAV_LINKS = [
  ["landing", "Home"],
  ["register", "Register"],
  ["dashboard", "Dashboard"],
  ["alerts", "Alerts"],
];

export default function NavBar({ page, setPage }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white/95 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button onClick={() => setPage("landing")} className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center shadow-md">
              <span className="text-white text-sm">🛡️</span>
            </div>
            <div className="hidden sm:block">
              <span className="text-sm font-black text-blue-900 tracking-tight">SafeTour</span>
              <span className="text-xs text-slate-400 block leading-none">Gov. Safety Platform</span>
            </div>
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(([p, label]) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                  page === p ? "bg-blue-600 text-white shadow-md" : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-slate-100"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-5 h-0.5 bg-slate-700 mb-1 rounded" />
            <div className="w-5 h-0.5 bg-slate-700 mb-1 rounded" />
            <div className="w-5 h-0.5 bg-slate-700 rounded" />
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden pb-3 flex flex-col gap-1">
            {NAV_LINKS.map(([p, label]) => (
              <button
                key={p}
                onClick={() => { setPage(p); setMenuOpen(false); }}
                className={`px-4 py-2.5 rounded-lg text-sm font-semibold text-left transition-all ${
                  page === p ? "bg-blue-600 text-white" : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
