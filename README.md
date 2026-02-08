# 🎯 Three Monkeys: AI-Powered Career Pulse

**Three Monkeys** is an advanced career intelligence platform designed for the **Celestial Buildathon**. It bridges the industrial gap for students using real-time market data, ATS-optimized analysis, and adaptive learning roadmap—all powered by a resilient, cost-free AI infrastructure.

---

## 🏆 Buildathon Problem Statements Solved

| ID | Difficulty | Feature | Solution |
|----|------------|---------|----------|
| **H1** | 🔴 Hard | **Market Pulse AI** | Real-time AI job market mapping & trend analysis. |
| **M2** | 🟡 Medium | **Learning Engine** | Adaptive learning interventions & skill-pivot roadmaps. |
| **S3** | 🟢 Easy | **Resume Analyzer** | Automated ATS scoring and domain-specific review. |

---

## 🚀 Key Features

### 1. 🔍 Market Pulse AI
- **Dynamic Market Scans**: Analyzes the Indian job market for core engineering (Mechanical, Robotics, Mechatronics).
- **Interactive Visualization**: Recharts-powered trend analysis for demand vs. supply.
- **AI Hub Mapping**: Identifies high-growth industrial cluster pivots (Pune, Bangalore, Chennai).

### 2. 📝 Automated Resume Optimizer
- **ATS Intelligence**: Instant 0-100 scoring with mechanical domain expertise (CAD, FEA, GD&T).
- **Mechanical Specialist**: Fine-tuned tips for core industrial sector clearances.

### 3. 🧠 Smart Learning Interventions
- **Adaptive Roadmap**: Generates skill-pivot paths based on current market scarcity.
- **ROI Predictions**: Visualizes the growth potential of learning high-demand modern tools.

---

## 🛠️ Resilient AI Architecture
Built using a **Dual-Failover AI Backend** on OpenRouter:
- **Zero Cost**: Uses 100% free high-accuracy models (Llama 3.3, Gemma 3, Mistral).
- **Reliability**: If one model is busy, the system automatically cycles through 7+ alternatives until a response is secured.
- **Fast Response**: Average insight generation under 10 seconds.

---

## 🐳 Docker Setup (Recommended for Judges)

The easiest way to run the entire system (Frontend + Backend) is using Docker.

### **1. Configuration**
Add your OpenRouter API Key to `backend/.env`:
```env
OPENROUTER_API_KEY=your_key_here
```

### **2. Launch**
```bash
docker-compose up --build
```

### **3. Access**
- **Frontend**: [http://localhost](http://localhost)
- **API Status**: [http://localhost:5000/api/health](http://localhost:5000/api/health)

---

## ⚙️ Local Development (Manual)

### **Backend**
```bash
cd backend
pip install -r requirements.txt
python server.py
```

### **Frontend**
```bash
npm install
npm run dev
```

---

## 👥 Team: Three Monkeys
- **Repository**: [https://github.com/sakrish205/Three-Monkeys](https://github.com/sakrish205/Three-Monkeys)
- **Design Philosophy**: Premium Dark Mode, Glassmorphism, and Data-First UX.
