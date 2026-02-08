# 🔧 MechLab - AI-Powered Career Intelligence for Mechanical Engineers

**MechLab** is an intelligent career platform designed for **Mechanical Engineering** students. It combines real-time market analysis, AI-powered resume optimization, and adaptive skill tracking to help engineers navigate their career journey.

---

## ✨ Features

### 🎯 Market Pulse AI
- **Real-time Job Market Analysis** - AI-driven insights on trending skills and demands
- **Interactive Trend Charts** - 6-month skill demand visualization with Recharts
- **Industrial Hub Mapping** - Focus on Indian engineering hubs (Pune, Bangalore, Chennai)
- **Learning Interventions** - Smart skill-pivot recommendations based on market gaps

### 📄 Resume Optimizer
- **ATS Compatibility Score** - Instant 0-100 scoring with visual feedback
- **Domain-Specific Analysis** - Specialized for Mechanical Engineering (CAD, FEA, GD&T)
- **Actionable Suggestions** - AI-generated improvement tips

### 🎓 Mech Skills Tracker
- **40+ Skills** across 7 categories: Core Engineering, Digital/Software, Robotics, Automation, HVAC, Emerging Tech
- **Progress Tracking** - Track your learning journey with persistent progress
- **Difficulty Filtering** - Sort by Beginner, Intermediate, Advanced levels
- **Resource Links** - Curated learning resources for each skill

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React 18 + Vite + TypeScript |
| **Styling** | Tailwind CSS + shadcn/ui |
| **UI Design** | Glassmorphism + Sora Font |
| **Backend** | Python Flask |
| **AI** | OpenRouter API (Llama 3.3, Gemma 3, Mistral) |
| **Charts** | Recharts |
| **Animations** | Framer Motion |
| **Deployment** | Docker + Docker Compose |

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Python 3.10+
- OpenRouter API Key

### Local Development

**Backend:**
```bash
cd backend
pip install -r requirements.txt
python server.py
```

**Frontend:**
```bash
npm install
npm run dev
```

### Docker (Recommended)

1. Add your API key to `backend/.env`:
```env
OPENROUTER_API_KEY=your_key_here
```

2. Launch:
```bash
docker-compose up --build
```

3. Access:
- **App**: http://localhost
- **API**: http://localhost:5000/api/health

---

## 🎨 Design Highlights

- **Glassmorphism UI** - Frosted glass effects with backdrop blur
- **Emerald Color Scheme** - Modern, vibrant accent colors
- **Sora Typography** - Clean, professional Google Font
- **Dark Mode** - Enabled by default for eye comfort
- **Responsive Layout** - Works on desktop and mobile

---

## 👥 Team: Three Monkeys

Built for **Celestial Buildathon 2026**

**Repository**: [github.com/sakrish205/Three-Monkeys](https://github.com/sakrish205/Three-Monkeys)
