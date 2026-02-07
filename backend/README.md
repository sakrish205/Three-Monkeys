# Resume Analysis Backend API for MechGuru

This backend service uses Google's Gemini API to analyze resumes against job descriptions.

## Setup

1. Install Python dependencies:
```bash
pip install -r requirements.txt
```

2. Create a `.env` file with your Google API key:
```
GOOGLE_API_KEY=your_gemini_api_key_here
```

3. Get your API key from: https://makersuite.google.com/app/apikey

4. Run the backend server:
```bash
python backend/server.py
```

The API will be available at `http://localhost:5000`

## API Endpoints

### POST /api/analyze-resume

Analyzes a resume against a job description.

**Request:**
- `resumeFile`: PDF file upload
- `jobDescription`: Job description text (optional)

**Response:**
```json
{
  "score": 82,
  "atsCompatibility": 87,
  "wordCount": 450,
  "keywords": {
    "found": ["CAD", "SolidWorks", "FEA"],
    "missing": ["ANSYS", "Pro/E"]
  },
  "improvements": ["Add quantifiable metrics...", "..."]
}
```
