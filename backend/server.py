from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import io
import base64
from dotenv import load_dotenv
import google.generativeai as genai
from PyPDF2 import PdfReader
from docx import Document
import json
import re
import requests

# Load environment variables
basedir = os.path.abspath(os.path.dirname(__file__))
load_dotenv(os.path.join(basedir, "api.env"))

app = Flask(__name__)
CORS(app)  # Enable CORS for React frontend

# Configure APIs
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
# Support multiple OpenRouter keys for redundancy and speed
OPENROUTER_API_KEYS = [
    os.getenv("OPENROUTER_API_KEY"),
    os.getenv("OPENROUTER_API_KEY_2")
]
# Filter out None and empty strings
OPENROUTER_API_KEYS = [k for k in OPENROUTER_API_KEYS if k]

if GOOGLE_API_KEY:
    genai.configure(api_key=GOOGLE_API_KEY)

import time

def get_best_model_list(task_type="creative"):
    """
    Returns an optimized list of models for speed and reliability.
    """
    if task_type == "analysis":
        # Put slightly faster high-capacity models first to avoid timeout
        return [
            "stepfun/step-3.5-flash:free",
            "qwen/qwen-2.5-72b-instruct:free",
            "meta-llama/llama-3.3-70b-instruct:free",
            "google/gemma-2-9b-it:free",
            "mistralai/pixtral-12b:free",
            "liquid/lfm-40b:free",
            "meta-llama/llama-3.1-8b-instruct:free",
            "qwen/qwen-2.5-7b-instruct:free",
            "microsoft/phi-3-medium-4k-instruct:free",
        ]
    else:
        return [
            "stepfun/step-3.5-flash:free",
            "google/gemini-2.0-flash-lite-preview-02-05:free",
            "qwen/qwen-2.5-7b-instruct:free",
            "meta-llama/llama-3.1-8b-instruct:free",
            "google/gemma-2-9b-it:free",
            "microsoft/phi-3-mini-128k-instruct:free",
            "meta-llama/llama-3.2-3b-instruct:free",
        ]

def call_openrouter_with_retry(prompt, task_type="creative"):
    """
    Helper to call OpenRouter with multiple keys, model fallbacks, and 429 retry logic.
    """
    if not OPENROUTER_API_KEYS:
        return None, "No OpenRouter API keys configured"

    models = get_best_model_list(task_type)
    last_error = "Unknown error"
    
    for i, model_name in enumerate(models):
        # Rotate through available keys
        key_index = i % len(OPENROUTER_API_KEYS)
        current_key = OPENROUTER_API_KEYS[key_index]
        
        # Max retries for a single model if it has a rate limit
        max_model_retries = 2
        for attempt in range(max_model_retries):
            try:
                print(f"\n⚡ Trying Model ({i+1}/{len(models)}): {model_name} [Key {key_index + 1}] (Attempt {attempt+1})")
                
                headers = {
                    "Authorization": f"Bearer {current_key}",
                    "Content-Type": "application/json",
                    "HTTP-Referer": "http://localhost:5173",
                    "X-Title": "MechLab Career Intelligence",
                }
                
                payload = {
                    "model": model_name,
                    "messages": [{"role": "user", "content": prompt}],
                    "temperature": 0.1 if task_type == "analysis" else 0.7,
                    "provider": {
                        "allow_fallbacks": True
                    }
                }
                
                # Use even longer timeout for resume analysis (60s) to handle slow free providers
                current_timeout = 60 if task_type == "analysis" else 30
                
                response = requests.post(
                    "https://openrouter.ai/api/v1/chat/completions",
                    headers=headers,
                    data=json.dumps(payload),
                    timeout=current_timeout 
                )
                
                if response.status_code == 200:
                    res_data = response.json()
                    if res_data.get('choices'):
                        content = res_data['choices'][0]['message']['content'].strip()
                        print(f"✅ Success with {model_name}")
                        return content, None
                
                if response.status_code == 429:
                    print(f"📉 Rate limited on {model_name}. Waiting 3s...")
                    time.sleep(3) # Slightly longer wait
                    continue 
                
                error_data = response.text
                last_error = f"{model_name} ({response.status_code}): {error_data}"
                print(f"⚠️ Failed with {model_name}: Status {response.status_code}")
                
                # If not 429, just move to next model immediately
                break 
                
            except Exception as e:
                last_error = str(e)
                print(f"❌ Error with {model_name}: {str(e)}")
                break # Move to next model
                
    return None, f"All models and keys failed. Last error: {last_error}"

def extract_text_from_pdf(pdf_file):
    """Extract text from PDF file"""
    try:
        pdf_reader = PdfReader(pdf_file)
        text = ""
        for page in pdf_reader.pages:
            text += page.extract_text()
        return text
    except Exception as e:
        print(f"Error extracting PDF text: {str(e)}")
        return None

def extract_text_from_docx(docx_file):
    """Extract text from DOCX file"""
    try:
        doc = Document(docx_file)
        text = ""
        for paragraph in doc.paragraphs:
            text += paragraph.text + "\n"
        return text
    except Exception as e:
        print(f"Error extracting DOCX text: {str(e)}")
        return None

def calculate_ats_score(extracted_data, job_description_text=None):
    """
    Deterministically calculates the ATS score based on extracted features.
    """
    weights = {
        "keywords": 0.40,  # 40% based on keyword overlap
        "experience": 0.30, # 30% based on section completeness
        "sections": 0.30    # 30% based on critical sections
    }
    
    score = 0
    details = {
        "keyword_score": 0,
        "experience_score": 0,
        "section_score": 0
    }
    
    # 1. Section Scoring (30%)
    sections = extracted_data.get("sections", {})
    req_sections = ["education", "experience", "projects", "skills"]
    found_sections = sum(1 for s in req_sections if sections.get(s))
    details["section_score"] = (found_sections / len(req_sections)) * 100
    score += details["section_score"] * weights["sections"]
    
    # 2. Keyword/Skill Scoring (40%)
    # If no JD, we look for core Mechanical Engineering keywords as a baseline
    found_skills = set([s.lower() for s in extracted_data.get("skills", {}).get("technical", [])])
    
    if job_description_text:
        # Compare extracted resume skills against common ME keywords
        jd_keywords = ["cad", "solidworks", "ansys", "fea", "mechanical", "design", "manufacturing", "simulation", "python", "matlab"]
        overlap = [k for k in jd_keywords if k in str(job_description_text.lower())]
        matches = [k for k in overlap if k in found_skills]
        if overlap:
            details["keyword_score"] = (len(matches) / len(overlap)) * 100
        else:
            details["keyword_score"] = 50 # Neutral if no clear keywords in JD
    else:
        # Baseline ME skill density
        essential_me = ["cad", "design", "solidworks", "catia", "ansys", "fea", "gd&t", "manufacturing"]
        matches = [s for s in found_skills if any(me in s for me in essential_me)]
        details["keyword_score"] = min(100, (len(matches) / 5) * 100)
        
    score += details["keyword_score"] * weights["keywords"]
    
    # 3. Experience Score (30%)
    # Based on depth of details found
    found_keywords = extracted_data.get("keywords", {}).get("found", [])
    if len(found_keywords) > 10:
        details["experience_score"] = 100
    elif len(found_keywords) > 5:
        details["experience_score"] = 70
    else:
        details["experience_score"] = 40
        
    score += details["experience_score"] * weights["experience"]
    
    return round(score)

@app.route("/api/analyze-resume", methods=["POST"])
def analyze_resume():
    """API endpoint to analyze resume"""
    try:
        if 'resumeFile' not in request.files:
            return jsonify({"error": "No resume file provided"}), 400
        
        file = request.files['resumeFile']
        job_description = request.form.get('jobDescription', '')
        filename = file.filename
        
        # Extract text based on file type
        resume_text = None
        file_type = "PDF"
        
        if filename.lower().endswith('.pdf'):
            resume_text = extract_text_from_pdf(io.BytesIO(file.read()))
        elif filename.lower().endswith('.docx'):
            file_type = "DOCX"
            resume_text = extract_text_from_docx(io.BytesIO(file.read()))
        else:
            return jsonify({"error": "Unsupported file format. Please upload PDF or DOCX"}), 400
            
        if not resume_text:
            return jsonify({"error": f"Could not extract text from {file_type}"}), 400
        
        # Truncate text to avoid prompt bloat
        resume_text = resume_text[:10000]
        real_word_count = len(resume_text.split())
        
        # NEW PROMPT: Focus strictly on data extraction for deterministic scoring
        prompt = f"""
        You are a precise data extraction engine for resume analysis.
        Extract the following features from the resume and compare against the job description.
        
        RESUME:
        {resume_text}
        
        {f"JOB DESCRIPTION: {job_description}" if job_description else ""}
        
        Respond ONLY with valid JSON capturing every skill, keyword, and section present.
        {{
          "keywords": {{ "found": [], "missing": [] }},
          "skills": {{ "technical": [], "soft": [] }},
          "sections": {{ "summary": bool, "education": bool, "experience": bool, "projects": bool, "skills": bool }},
          "improvements": ["List 3-5 specific, actionable improvements based on the data"]
        }}
        """
        
        content, error = call_openrouter_with_retry(prompt, task_type="analysis")
        
        if error:
            return jsonify({"error": error}), 500
            
        try:
            json_match = re.search(r'(\{.*\})', content, re.DOTALL)
            if json_match:
                extracted_data = json.loads(json_match.group(1))
            else:
                extracted_data = json.loads(content)
                
            # CALCULATE SCORE DETERMINISTICALLY IN PYTHON
            final_score = calculate_ats_score(extracted_data, job_description)
            
            # Form final response
            analysis = {
                "score": final_score,
                "atsCompatibility": final_score,
                "wordCount": real_word_count,
                "keywords": extracted_data.get("keywords", {"found": [], "missing": []}),
                "skills": extracted_data.get("skills", {"technical": [], "soft": []}),
                "sections": extracted_data.get("sections", {}),
                "improvements": extracted_data.get("improvements", []),
                "formatting": {
                    "fileType": file_type,
                    "parsingSuccess": True
                }
            }
            
            return jsonify(analysis)
        except Exception as e:
            return jsonify({"error": f"Failed to parse extraction response: {str(e)}"}), 500
            
    except Exception as e:
        print(f"Error in analyze_resume: {str(e)}")
        return jsonify({"error": str(e)}), 500

@app.route("/api/market/insights", methods=["GET"])
def get_market_insights():
    """Generate high-variance AI-powered market insights for Indian Job Market"""
    domain = request.args.get("domain", "Mechanical Engineering")
    try:
        prompt = f"""
        Act as a specialized career advisor and industrial market analyst for CORE ENGINEERING fields in India.
        Domain: {domain}
        
        Generate realistic, high-variance JSON data:
        {{
          "trends": [ {{ "month": "Jan", "demand": 65, "supply": 45 }}, ... ],
          "topSkills": [ {{ "name": "Skill", "demand": 92, "growth": "+45%", "category": "Core" }} ],
          "jobAlerts": [ {{ "id": 1, "role": "Role", "company": "Company", "location": "City", "salary": "Range", "match": 95, "posted": "2d ago", "tags": [], "description": "" }} ],
          "pivotRecommendation": {{ "role": "Emerging Role", "match": 85, "description": "" }},
          "learningIntervention": {{ "plannedSkill": "Legacy", "targetSkill": "Modern", "increase": 40, "rationale": "" }}
        }}
        """
        
        content, error = call_openrouter_with_retry(prompt, task_type="creative")
        
        if error:
            return jsonify({"error": error}), 500
            
        try:
            json_match = re.search(r'(\{.*\})', content, re.DOTALL)
            if json_match:
                data = json.loads(json_match.group(1))
            else:
                data = json.loads(content)
            return jsonify(data)
        except Exception as e:
            return jsonify({"error": f"Failed to parse insights: {str(e)}"}), 500
            
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/api/health", methods=["GET"])
def health_check():
    return jsonify({
        "status": "running",
        "api_keys_configured": len(OPENROUTER_API_KEYS)
    })

if __name__ == "__main__":
    port = int(os.getenv("PORT", 5000))
    print(f"MechLab Backend starting on http://localhost:{port}")
    print(f"Configured Keys: {len(OPENROUTER_API_KEYS)}")
    app.run(host="0.0.0.0", debug=True, port=port)
