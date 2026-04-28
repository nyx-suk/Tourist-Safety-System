// src/services/api.js — Centralized API client

const BASE_URL = process.env.REACT_APP_API_URL || "/api";

async function request(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json", ...options.headers },
    ...options,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "API error");
  return data;
}

// ─── Tourists ─────────────────────────────────────────────────────────────────
export const touristApi = {
  getAll: (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    return request(`/tourists${qs ? `?${qs}` : ""}`);
  },
  getById: (id) => request(`/tourists/${id}`),
  register: (body) => request("/tourists/register", { method: "POST", body: JSON.stringify(body) }),
  updateStatus: (id, body) => request(`/tourists/${id}/status`, { method: "PUT", body: JSON.stringify(body) }),
  delete: (id) => request(`/tourists/${id}`, { method: "DELETE" }),
};

// ─── Alerts ───────────────────────────────────────────────────────────────────
export const alertApi = {
  getAll: (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    return request(`/alerts${qs ? `?${qs}` : ""}`);
  },
  getById: (id) => request(`/alerts/${id}`),
  create: (body) => request("/alerts", { method: "POST", body: JSON.stringify(body) }),
  resolve: (id) => request(`/alerts/${id}/resolve`, { method: "PUT" }),
  assign: (id, unit) => request(`/alerts/${id}/assign`, { method: "PUT", body: JSON.stringify({ unit }) }),
};

// ─── Stats ────────────────────────────────────────────────────────────────────
export const statsApi = {
  get: () => request("/stats"),
};
