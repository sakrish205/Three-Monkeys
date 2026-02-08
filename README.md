# 🎯 Three Monkeys: AI-Powered Career Pulse

**Three Monkeys** is an advanced career intelligence platform designed to bridge the gap between students and the evolving industrial landscape. Built for the **Celestial Buildathon**, it provides real-time job market insights, ATS-optimized resume analysis, and adaptive learning interventions specifically tailored for core engineering sectors in India.

---

## 🚀 Key Features

### 1. 🔍 Market Pulse AI (Problem Statement H1 - Hard)
- **Real-time Market Scanning**: Dynamically analyzes the Indian job market for core engineering domains (Mechanical, Robotics, Mechatronics, etc.).
- **Demand Visualization**: Interactive charts showing skill demand vs. supply trends.
- **AI Pivot Suggestions**: Personalized career pivot recommendations based on emerging industrial hubs (e.g., Pune, Bangalore, Chennai).
- **Live Intervention Output**: "Pivots" users from legacy skills to modern high-demand competencies with quantifiable ROI.

### 2. 📝 Automated Resume Analyzer (Problem Statement S3 - Easy)
- **ATS Scoring**: Instant compatibility check against industry standards.
- **Mechanical Domain Expertise**: Specialized analysis for ME skills like CAD, FEA, GD&T, and CFD.
- **Actionable Feedback**: Generates 5-7 specific improvements to help resumes clear automated screenings.

### 3. 🧠 Smart Learning Engine (Problem Statement M2 - Medium)
- **Adaptive Roadmap**: Generates personalized learning paths based on current market deficiency.
- **Resource Curations**: Direct links to top-tier learning materials (Coursera, Udemy, etc.).

---

## 🛠️ Technical Architecture

### **Resilient AI Backend**
The backend implements a **Robust Failover System** using OpenRouter to ensure 100% uptime with zero cost:
- **Priority Models**: Llama 3.3 70B, Google Gemma 3, and Mistral Small.
- **Auto-Failover Logic**: If a free model is rate-limited or busy, the system automatically cycles through 7+ alternative high-accuracy free models.
- **Domain Specialization**: Specialized prompts fine-tuned for Indian industrial engineering contexts.

### **Modern Frontend**
- **Framework**: React 18 + Vite + TypeScript.
- **UI/UX**: Custom themed via **Shadcn/UI**, **Framer Motion** for animations, and a rich dark-mode aesthetics.
- **Visuals**: **Recharts** for interactive market trend data visualization.

---

## 🐳 Docker Setup (Easiest Way)

The easiest way to run the entire system (Frontend + Backend) is using Docker Compose.

### **1. Prerequisites**
- Install [Docker Desktop](https://www.docker.com/products/docker-desktop/)

### **2. Setup Environment**
Update the `backend/.env` file with your OpenRouter API key.

### **3. Run with One Command**
```bash
docker-compose up --build
```
- **Frontend**: Accessible at [http://localhost](http://localhost)
- **Backend API**: Accessible at [http://localhost:5000](http://localhost:5000)

---

## ⚙️ Local Installation (Manual)

### **1. Backend Setup**
```bash
cd backend
python -m venv venv
source venv/bin/activate  # venv\Scripts\activate on Windows
pip install -r requirements.txt
python server.py
```

### **2. Frontend Setup**
```bash
# In the root directory
npm install
npm run dev
```

## 🏆 Buildathon Compliance
This project addresses **3 problem statements** (Easy, Medium, Hard) within a single unified platform, focusing on high-variance data visualization and premium design aesthetics (10 marks).

---

## 👥 Team: Three Monkeys
- **Repository**: [https://github.com/sakrish205/Three-Monkeys](https://github.com/sakrish205/Three-Monkeys)
- **Tech Stack**: React, Python/Flask, TailwindCSS, OpenRouter AI.
