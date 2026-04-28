// src/pages/LandingPage.jsx

import React, { useState, useEffect } from "react";
import { SectionHeader } from "../components/Shared";
import { FEATURES } from "../data/dummyData";

export default function LandingPage({ setPage }) {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setTimeout(() => setLoaded(true), 100); }, []);

  return (
    <div className="min-h-screen">
      {/* ── Hero ── */}
      <section className="relative bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800 overflow-hidden">
        {/* Ambient glows */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-10 left-10 w-96 h-96 bg-blue-400 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-cyan-400 rounded-full blur-3xl" />
        </div>
        {/* Grid */}
        <div className="absolute inset-0 opacity-5 pointer-events-none" style={{
          backgroundImage: "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-36">
          <div className="max-w-3xl">
            <div className={`transition-all duration-700 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
              <span className="inline-flex items-center gap-2 bg-blue-800/60 border border-blue-600/50 text-blue-200 text-xs font-bold px-4 py-2 rounded-full mb-6 backdrop-blur-sm">
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                GOVERNMENT OF INDIA — MINISTRY OF TOURISM
              </span>
            </div>

            <div className={`transition-all duration-700 delay-100 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-6">
                Smart Tourist
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-emerald-300">
                  Safety Monitoring
                </span>
                <br />
                System
              </h1>
            </div>

            <div className={`transition-all duration-700 delay-200 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
              <p className="text-blue-200 text-lg sm:text-xl leading-relaxed mb-10 max-w-2xl">
                AI-powered real-time surveillance, blockchain-secured digital identities, and instant emergency
                response — ensuring every tourist travels safely across India.
              </p>
            </div>

            <div className={`transition-all duration-700 delay-300 flex flex-wrap gap-4 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
              <button
                onClick={() => setPage("register")}
                className="bg-emerald-500 hover:bg-emerald-400 text-white font-bold px-8 py-4 rounded-xl shadow-lg shadow-emerald-900/40 transition-all hover:scale-105 hover:shadow-xl flex items-center gap-2"
              >
                <span>🧳</span> Register as Tourist
              </button>
              <button
                onClick={() => setPage("dashboard")}
                className="bg-white/10 hover:bg-white/20 border border-white/30 text-white font-bold px-8 py-4 rounded-xl backdrop-blur-sm transition-all hover:scale-105 flex items-center gap-2"
              >
                <span>🏛️</span> Authority Dashboard
              </button>
              <button className="text-blue-300 hover:text-white font-semibold px-6 py-4 transition-colors flex items-center gap-2">
                <span>🔐</span> Login
              </button>
            </div>
          </div>
        </div>

        {/* Stats strip */}
        <div className="relative border-t border-blue-800/50 bg-blue-950/40 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
              {[["1.2M+","Tourists Protected"],["99.7%","Uptime SLA"],["<10s","SOS Response"],["34","States Covered"]].map(([val, lab]) => (
                <div key={lab}>
                  <div className="text-2xl font-black text-white">{val}</div>
                  <div className="text-blue-400 text-xs font-semibold mt-1 uppercase tracking-widest">{lab}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Core Capabilities"
            title="Built for Safety at Scale"
            subtitle="Four pillars of intelligent protection powering the nation's premier tourist safety infrastructure."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map((f, i) => (
              <div key={i} className="bg-white rounded-2xl p-7 shadow-sm border border-slate-200 hover:shadow-md hover:-translate-y-1 transition-all duration-300 group">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl flex items-center justify-center text-2xl mb-5 group-hover:scale-110 transition-transform">
                  {f.icon}
                </div>
                <h3 className="font-bold text-slate-900 text-base mb-2">{f.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader eyebrow="Workflow" eyebrowColor="text-emerald-600" title="How It Works" />
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 relative">
            <div className="hidden sm:block absolute top-10 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-blue-200 via-blue-400 to-blue-200" />
            {[
              { icon: "📝", title: "Register & Verify", desc: "Tourist registers with official ID. Blockchain Digital Tourist ID issued instantly." },
              { icon: "📡", title: "Real-time Monitoring", desc: "AI engine tracks GPS, activity, and geo-fence compliance throughout the trip." },
              { icon: "🚁", title: "Instant Response", desc: "Alerts trigger automated escalation. Nearest emergency unit dispatched in seconds." },
            ].map((s, i) => (
              <div key={i} className="text-center relative">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-4 shadow-lg shadow-blue-200 relative z-10">
                  {s.icon}
                </div>
                <h3 className="font-bold text-slate-900 text-lg mb-2">{s.title}</h3>
                <p className="text-slate-500 text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-slate-900 text-slate-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">🛡️</span>
                <span className="text-white font-black">SafeTour India</span>
              </div>
              <p className="text-sm">A Government of India initiative under the National Tourist Safety Mission.</p>
            </div>
            <div>
              <p className="text-white font-semibold mb-3">Quick Links</p>
              <ul className="space-y-2 text-sm">
                {["Privacy Policy","Terms of Use","Accessibility","RTI Portal"].map(l => (
                  <li key={l}><a href="#" className="hover:text-white transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-white font-semibold mb-3">Emergency Contact</p>
              <p className="text-sm">Tourist Helpline: <span className="text-emerald-400 font-bold">1800-111-363</span></p>
              <p className="text-sm mt-1">Control Room: <span className="text-emerald-400 font-bold">+91-11-2301-4694</span></p>
              <p className="text-sm mt-1">Email: <span className="text-blue-400">safetour@gov.in</span></p>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-6 text-center text-xs">
            © 2024 Ministry of Tourism, Government of India. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
