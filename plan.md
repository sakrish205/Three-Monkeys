# 🔧 MechLab - Development Plan

## Project Overview

**MechLab** is an AI-powered career intelligence platform for Mechanical Engineering students, built for the **Celestial Buildathon 2026**.

---

## 🎯 Problem Statements Addressed

| Level | ID | Problem | Solution | Status |
|-------|-----|---------|----------|--------|
| 🟢 Easy | S3 | Automated Resume Review | **Resume Optimizer** | ✅ Complete |
| 🟡 Medium | M2 | Adaptive Learning Path | **Mech Skills Tracker** | ✅ Complete |
| 🔴 Hard | H1 | AI-Driven Job Market Mapping | **Market Pulse AI** | ✅ Complete |

---

## ✅ Implementation Status

### Resume Optimizer (S3)
- [x] PDF/DOCX file upload support
- [x] ATS Compatibility Scoring (0-100) with dynamic colors
- [x] Mechanical Engineering keyword matching
- [x] AI-generated improvement suggestions
- [x] Glassmorphism UI design

### Mech Skills Tracker (M2)
- [x] 40+ skills across 7 categories
- [x] Progress tracking with localStorage persistence
- [x] Difficulty-based filtering (Beginner/Intermediate/Advanced)
- [x] Expandable skill cards with resources
- [x] Curated learning links

### Market Pulse AI (H1)
- [x] Real-time AI market analysis
- [x] Interactive skill demand trend charts
- [x] Indian industrial hub mapping
- [x] Learning intervention recommendations
- [x] Personalized job matching with scores

---

## 🎨 UI/UX Accomplishments

- [x] Glassmorphism design system (backdrop-blur, translucent cards)
- [x] Emerald/Teal color scheme with proper contrast
- [x] Sora font from Google Fonts
- [x] Dark mode enabled by default
- [x] Animated navigation bar with Framer Motion
- [x] Responsive single-column layout
- [x] Skeleton loaders for AI states

---

## 🛠️ Tech Stack

| Component | Technology |
|-----------|------------|
| Frontend | React 18 + Vite + TypeScript |
| Styling | Tailwind CSS + shadcn/ui |
| Backend | Python Flask |
| AI | OpenRouter (Llama 3.3, Gemma 3, Mistral) |
| Charts | Recharts |
| Animations | Framer Motion |
| Deployment | Docker + Docker Compose |

---

## 📦 Project Structure

```
Three Monkeys/
├── src/
│   ├── components/
│   │   ├── ui/          # shadcn components + custom UI
│   │   ├── layout/      # Layout, Footer, Navbar
│   │   ├── market/      # Market page components
│   │   ├── resume/      # Resume analyzer components
│   │   └── learning/    # Skills tracker components
│   ├── pages/           # Route pages
│   ├── data/            # Static data (skills list)
│   └── lib/             # Utilities
├── backend/
│   ├── server.py        # Flask API server
│   └── requirements.txt
├── index.html
├── vite.config.ts
├── tailwind.config.js
└── docker-compose.yml
```

---

## 🚀 Deployment

### Docker
```bash
docker-compose up --build
```

### Manual
```bash
# Backend
cd backend && pip install -r requirements.txt && python server.py

# Frontend
npm install && npm run dev
```

---

**Project Complete! 🎉**
