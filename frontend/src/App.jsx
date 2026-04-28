// src/App.jsx

import React, { useState } from "react";
import NavBar from "./components/NavBar";
import LandingPage from "./pages/LandingPage";
import RegistrationPage from "./pages/RegistrationPage";
import DashboardPage from "./pages/DashboardPage";
import AlertsPage from "./pages/AlertsPage";

const PAGES = {
  landing: LandingPage,
  register: RegistrationPage,
  dashboard: DashboardPage,
  alerts: AlertsPage,
};

export default function App() {
  const [page, setPage] = useState("landing");

  const PageComponent = PAGES[page] || LandingPage;

  return (
    <div className="min-h-screen font-sans antialiased bg-slate-50">
      <NavBar page={page} setPage={setPage} />
      <PageComponent setPage={setPage} />
    </div>
  );
}
