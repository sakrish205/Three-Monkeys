# MechGuru - AI-Powered Resume Optimizer for Mechanical Engineers

Complete setup guide for the real AI-powered resume analysis using Google Gemini API.

## 🚀 Complete Setup

### Step 1: Install Python Backend Dependencies

1. Navigate to the backend directory:
```bash
cd backend
```

2. Create a virtual environment (recommended):
```bash
python -m venv venv
```

3. Activate the virtual environment:
- **Windows:**
  ```bash
  venv\Scripts\activate
  ```
- **Mac/Linux:**
  ```bash
  source venv/bin/activate
  ```

4. Install dependencies:
```bash
pip install -r requirements.txt
```

### Step 2: Get Google Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Click "Create API Key"
3. Copy your API key

### Step 3: Configure Backend

1. Create `.env` file in `backend/` directory:
```bash
cd backend
copy .env.example .env  # Windows
# OR
cp .env.example .env    # Mac/Linux
```

2. Edit `backend/.env` and add your API key:
```
GOOGLE_API_KEY=your_actual_api_key_here
PORT=5000
```

### Step 4: Start the Backend Server

```bash
cd backend
python server.py
```

You should see:
```
🚀 Backend server starting on http://localhost:5000
📊 Gemini API configured: True
```

### Step 5: Start the Frontend

In a **new terminal** window:

```bash
npm run dev
```

## ✅ Testing the Setup

1. Open `http://localhost:5173` in your browser
2. Go to **Resume** page
3. You should see a **green status** (no warning banners)
4. Paste a job description
5. Upload a PDF resume
6. Wait for AI-powered analysis!

## 🔧 Troubleshooting

### "Backend Server Not Running"
- Make sure you ran `python backend/server.py`
- Check that port 5000 is not in use
- Look for errors in the Python terminal

### "Gemini API Not Configured"
- Check that `GOOGLE_API_KEY` is in `backend/.env`
- Verify the API key is correct
- Make sure you restarted the server after adding the key

### "Analysis Failed"
- Check Python terminal for error messages
- Ensure you uploaded a valid PDF file
- Try a smaller file if it's too large

## 📁 Project Structure

```
Three Monkeys/
├── backend/
│   ├── server.py           # Flask API server
│   ├── requirements.txt    # Python dependencies
│   ├── .env               # Your API key (create this)
│   └── .env.example       # Example env file
├── src/
│   ├── lib/
│   │   └── resumeAnalyzer.ts  # API integration
│   └── pages/
│       └── Resume.tsx     # Main resume page
└── .env                   # Frontend environment
```

## 🎯 Features

- ✅ Real AI-powered analysis using Google Gemini
- ✅ Job description matching
- ✅ Mechanical Engineering keyword extraction
- ✅ ATS compatibility scoring
- ✅ Skill gap analysis
- ✅ Actionable improvements

## 🔐 Security Note

- Never commit `.env` files to Git
- Keep your API key private
- The `.gitignore` already excludes `.env` files
