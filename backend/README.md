# MechLab Backend API

This backend service uses OpenRouter with multiple model fallbacks to analyze resumes and provide career insights.

## Setup

1. Install Python dependencies:
```bash
pip install -r requirements.txt
```

2. Create an `api.env` file in this directory:
```
OPENROUTER_API_KEY=your_key_here
OPENROUTER_API_KEY_2=your_secondary_key_here (optional)
```

3. Get your API key from: https://openrouter.ai/keys

4. Run the backend server:
```bash
python server.py
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
