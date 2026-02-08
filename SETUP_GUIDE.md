# 🚀 MechLab Setup Guide

How to run the project on any Windows/Mac/Linux machine.

## Prerequisites

Before starting, ensure you have:
1. **Git** installed ([Download](https://git-scm.com/downloads))
2. **Docker Desktop** installed ([Download](https://www.docker.com/products/docker-desktop/)) - *Recommended method*
3. **OpenRouter API Key** (Get one for free at [openrouter.ai](https://openrouter.ai/))

---

## ⚡ Method 1: The "One-Click" Way (Recommended)

This runs the entire app (Frontend + Backend) in containers. No manual installation of Python or Node.js needed.

1. **Clone the Project**
   Open Terminal / Command Prompt:
   ```bash
   git clone https://github.com/sakrish205/Three-Monkeys.git
   cd Three-Monkeys
   ```

2. **Configure API Key**
   - Navigate to the `backend` folder.
   - Create a new file named `api.env`.
   - Add your API key inside it:
     ```env
     OPENROUTER_API_KEY=sk-or-v1-xxxxxxxxxxxxxxxxxxxx
     ```

3. **Launch the App**
   Run this command in the main `Three-Monkeys` folder:
   ```bash
   docker-compose up --build
   ```

4. **Access the App**
   - Open your browser to: **[http://localhost](http://localhost)**
   - API Status: [http://localhost:5000/api/health](http://localhost:5000/api/health)

---

## 🛠️ Method 2: Manual Setup (For Developers)

Use this if you want to edit code or don't have Docker. You need **Node.js (v18+)** and **Python (v3.10+)** installed.

### 1. Setup Backend
Open a terminal in the `Three-Monkeys` folder:
```bash
cd backend
# Create virtual environment (optional but recommended)
python -m venv venv
# Windows:
.\venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create api.env file with your API key as shown above

# Run Server
python server.py
```
*Backend runs on: http://localhost:5000*

### 2. Setup Frontend
Open a **new** terminal window in the `Three-Monkeys` folder:
```bash
npm install
npm run dev
```
*Frontend runs on: http://localhost:5173*
