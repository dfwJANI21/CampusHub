# 🎓 CampusHub — Discover Your Campus Universe

A visually stunning, animation-heavy full-stack web application designed for campus engagement. Students can discover events with live countdown timers, RSVP, browse elite clubs, send join requests, and post their own events/clubs.

## 🚀 Tech Stack

- **Frontend:** Next.js 16 (App Router), TypeScript, Framer Motion (Animations), Lucide Icons, Custom Glassmorphism CSS with Dynamic Particle Canvas.
- **Backend:** Python, FastAPI, SQLAlchemy (ORM), SQLite Database, JWT Authentication, Password Hashing.

## 📁 Repository Structure

```
CampusHub/
├── frontend/          # Next.js 16 React Web Application
│   ├── src/           # Components, Modals, Pages & Styling
│   └── package.json
├── backend/           # FastAPI Python REST API
│   ├── main.py        # API Routes & Application Entry
│   ├── models.py      # SQLAlchemy Database Models
│   ├── schemas.py     # Pydantic Schemas
│   └── requirements.txt
└── README.md
```

## 🛠️ Getting Started

### 1. Backend Setup (FastAPI)
```bash
cd backend
python -m venv venv
# Windows: venv\Scripts\activate | Mac/Linux: source venv/bin/activate
pip install -r requirements.txt
python -m uvicorn main:app --reload --port 8000
```
- **API Server:** http://localhost:8000
- **Swagger Documentation:** http://localhost:8000/docs

### 2. Frontend Setup (Next.js)
```bash
cd frontend
npm install
npm run dev
```
- **Web App:** http://localhost:3000

## 🔑 Demo Credentials

- **Username:** `manoj` | **Password:** `pass123`
- **Username:** `admin` | **Password:** `admin123`
