# 🛡️ Smart Tourist Safety Monitoring System

A full-stack web application for the Government of India's Smart Tourist Safety Monitoring & Incident Response System.

## 🗂️ Project Structure

```
tourist-safety-system/
├── frontend/          # React + Tailwind CSS
│   ├── public/
│   └── src/
│       ├── components/    # NavBar, AlertCard, Shared UI
│       ├── pages/         # Landing, Registration, Dashboard, Alerts
│       ├── services/      # API client (api.js)
│       └── data/          # Fallback dummy data
└── backend/           # Node.js + Express REST API
    ├── routes/        # tourists, alerts, stats
    ├── data/          # In-memory data store (db.js)
    └── server.js
```

## ⚡ Quick Start

### 1. Start the Backend

```bash
cd backend
npm install
npm run dev        # development (nodemon)
# or
npm start          # production
```

Backend runs on **http://localhost:5000**

### 2. Start the Frontend

```bash
cd frontend
npm install
npm start
```

Frontend runs on **http://localhost:3000** and proxies API calls to port 5000.

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/tourists` | List all tourists |
| GET | `/api/tourists/:id` | Get tourist by ID |
| POST | `/api/tourists/register` | Register a new tourist |
| PUT | `/api/tourists/:id/status` | Update tourist status |
| DELETE | `/api/tourists/:id` | Remove tourist |
| GET | `/api/alerts` | List all alerts |
| GET | `/api/alerts/:id` | Get alert by ID |
| POST | `/api/alerts` | Create new alert |
| PUT | `/api/alerts/:id/resolve` | Mark alert resolved |
| PUT | `/api/alerts/:id/assign` | Assign unit to alert |
| GET | `/api/stats` | Dashboard statistics |

### Example: Register a Tourist

```bash
curl -X POST http://localhost:5000/api/tourists/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Ravi Kumar",
    "passport": "IN1234567",
    "nationality": "Indian",
    "startDate": "2024-12-10",
    "endDate": "2024-12-20",
    "emergencyName": "Seema Kumar",
    "emergencyPhone": "+91-9876543210"
  }'
```

### Example: Create an Alert

```bash
curl -X POST http://localhost:5000/api/alerts \
  -H "Content-Type: application/json" \
  -d '{
    "type": "Panic Button Triggered",
    "touristId": "TID-2024-0891",
    "tourist": "Ravi Kumar",
    "location": "Ooty Lake",
    "severity": "critical",
    "desc": "SOS activated near Ooty Lake viewpoint."
  }'
```

---

## 🎨 Pages

| Page | Route | Description |
|------|-------|-------------|
| Landing | `landing` | Hero, features, how-it-works, footer |
| Registration | `register` | Multi-section form + live ID card preview |
| Dashboard | `dashboard` | Sidebar, stats, tourist table, heatmap, missing |
| Alerts | `alerts` | Filterable incident cards with response actions |

---

## 🛠️ Tech Stack

**Frontend**
- React 18 (functional components + hooks)
- Tailwind CSS (utility-first, no UI libraries)
- Native fetch API for backend calls

**Backend**
- Node.js + Express 4
- In-memory data store (swap for MongoDB/PostgreSQL in production)
- CORS enabled for local dev
- RESTful JSON API

---

## 🚀 Production Notes

1. Replace `backend/data/db.js` with a real database (MongoDB / PostgreSQL)
2. Add authentication middleware (JWT recommended)
3. Set `REACT_APP_API_URL` env var to your deployed API base URL
4. Build frontend: `cd frontend && npm run build`
5. Serve the `build/` folder via nginx or a CDN

---

## 📞 Support

Tourist Helpline: **1800-111-363**  
Email: safetour@gov.in
