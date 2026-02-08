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
load_dotenv("api.env")

app = Flask(__name__)
CORS(app)  # Enable CORS for React frontend

# Configure APIs
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")

if GOOGLE_API_KEY:
    genai.configure(api_key=GOOGLE_API_KEY)


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

def analyze_with_openrouter(resume_text, job_description):
    """Analyze resume using OpenRouter with multiple model fallback"""
    models_to_try = [
        "meta-llama/llama-3.3-70b-instruct:free",
        "google/gemma-3-27b-it:free",
        "mistralai/mistral-small-3.1-24b-instruct:free",
        "meta-llama/llama-3.2-3b-instruct:free",
        "google/gemma-3-12b-it:free",
        "google/gemma-3-4b-it:free",
        "stepfun/step-3.5-flash:free",
    ]
    
    last_error = None
    
    for model_name in models_to_try:
        try:
            print(f"\n--- Trying Model for Resume Analysis: {model_name} ---")
            
            prompt = f"""
            You are an expert ATS (Applicant Tracking System) analyzer specialized in Mechanical Engineering roles.
            
            Analyze the following resume{" and job description" if job_description else ""}:
            
            RESUME:
            {resume_text}
            
            {f"JOB DESCRIPTION: {job_description}" if job_description else ""}
            
            Provide a detailed analysis in the following JSON format (respond ONLY with valid JSON):
            {{
              "score": <overall score 0-100>,
              "atsCompatibility": <ATS compatibility score 0-100>,
              "wordCount": <word count>,
              "keywords": {{
                "found": [<list of relevant ME keywords found in resume>],
                "missing": [<list of important ME keywords missing from resume{" that are in the JD" if job_description else ""}>]
              }},
              "skills": {{
                "technical": [<list of technical skills found>],
                "soft": [<list of soft skills found>]
              }},
              "sections": {{
                "summary": <true/false>,
                "education": <true/false>,
                "experience": <true/false>,
                "projects": <true/false>,
                "skills": <true/false>
              }},
              "improvements": [<list of 5-7 specific improvement suggestions>]
            }}
            
            Focus on Mechanical Engineering skills like: CAD (SolidWorks, AutoCAD, CATIA, Pro/E), FEA, CFD, ANSYS, MATLAB, 
            Manufacturing processes, GD&T, Thermodynamics, Fluid Mechanics, Material Science, Design for Manufacturing, etc.
            """
            
            headers = {
                "Authorization": f"Bearer {OPENROUTER_API_KEY}",
                "Content-Type": "application/json",
                "HTTP-Referer": "http://localhost:3000",
                "X-Title": "Three Monkeys Resume Pulse",
            }
            
            payload = {
                "model": model_name,
                "messages": [{"role": "user", "content": prompt}],
                "temperature": 0.5 # Lower temperature for better extraction
            }
            
            response = requests.post(
                "https://openrouter.ai/api/v1/chat/completions",
                headers=headers,
                data=json.dumps(payload),
                timeout=60
            )
            
            if response.status_code != 200:
                error_msg = f"OpenRouter Error {response.status_code} with {model_name}: {response.text}"
                print(f"❌ {error_msg}")
                last_error = error_msg
                continue
                
            res_data = response.json()
            if not res_data.get('choices'):
                print(f"Empty response from {model_name}")
                continue
                
            response_text = res_data['choices'][0]['message']['content'].strip()
            
            # Extract JSON from response
            json_match = re.search(r'\{.*\}', response_text, re.DOTALL)
            if json_match:
                response_text = json_match.group(0)
            
            analysis = json.loads(response_text)
            
            # Ensure we have the formatting field
            if "formatting" not in analysis:
                analysis["formatting"] = {
                    "fileType": "PDF", # Default, update in route
                    "parsingSuccess": True
                }
            
            print(f"Success with model: {model_name}")
            return analysis
            
        except Exception as e:
            error_msg = f"Error with {model_name}: {str(e)}"
            print(f"❌ {error_msg}")
            last_error = str(e)
            continue
            
    # If we get here, all models failed
    print("All models failed for Resume Analysis.")
    if last_error:
        with open("backend_errors.log", "a", encoding="utf-8") as f:
            f.write(f"Resume Analysis - All models failed. Last error: {last_error}\n")
    return None

@app.route("/api/analyze-resume", methods=["POST"])
def analyze_resume():
    """API endpoint to analyze resume"""
    try:
        # Check if file was uploaded
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
        
        # Analyze with OpenRouter API
        if OPENROUTER_API_KEY:
            analysis = analyze_with_openrouter(resume_text, job_description)
            if analysis:
                # Update file type in response
                if "formatting" in analysis:
                    analysis["formatting"]["fileType"] = file_type
                return jsonify(analysis)
            else:
                return jsonify({"error": "Analysis failed check backend_errors.log"}), 500
        else:
            # Fallback: Return mock data if no API key
            return jsonify({
                "error": "OPENROUTER_API_KEY not configured. Please add your OpenRouter API key to .env file",
                "note": "Get API key from: https://openrouter.ai/keys"
            }), 503
            
    except Exception as e:
        error_msg = f"Error in analyze_resume endpoint: {str(e)}"
        print(error_msg)
        import traceback
        traceback_print = traceback.format_exc()
        with open("backend_errors.log", "a", encoding="utf-8") as f:
            f.write(error_msg + "\n" + traceback_print + "\n")
        return jsonify({"error": str(e)}), 500

@app.route("/api/market/insights", methods=["GET"])
def get_market_insights():
    """Generate high-variance AI-powered market insights for Indian Job Market"""
    domain = request.args.get("domain", "Mechanical Engineering")
    try:
        models_to_try = [
            "meta-llama/llama-3.3-70b-instruct:free",
            "google/gemma-3-27b-it:free",
            "mistralai/mistral-small-3.1-24b-instruct:free",
            "meta-llama/llama-3.2-3b-instruct:free",
            "google/gemma-3-12b-it:free",
            "google/gemma-3-4b-it:free",
            "stepfun/step-3.5-flash:free",
        ]
        
        last_error = None
        for model_name in models_to_try:
            try:
                print(f"\n--- Trying Model: {model_name} ---")
                
                # Adding a random salt to ensure data variety between requests
                import random
                salt = random.randint(1, 1000)
                
                prompt = f"""
                Act as a specialized career advisor and industrial market analyst for CORE ENGINEERING fields (Mechanical, Robotics, Mechatronics, HVAC, Automation, Automotive, Design Engineering). 
                Focus EXCLUSIVELY on the INDIAN job market for {domain}.
                Respond ONLY with valid JSON.
                
                Generate realistic, high-variance data for the following structure:
                {{
                  "trends": [
                    {{ "month": "Jan", "demand": 65, "supply": 45 }},
                    {{ "month": "Feb", "demand": 72, "supply": 48 }},
                    {{ "month": "Mar", "demand": 85, "supply": 52 }},
                    {{ "month": "Apr", "demand": 78, "supply": 55 }},
                    {{ "month": "May", "demand": 92, "supply": 58 }},
                    {{ "month": "Jun", "demand": 88, "supply": 60 }}
                  ],
                  "topSkills": [
                    {{ "name": "Skill 1", "demand": 92, "growth": "+45%", "category": "Core" }},
                    {{ "name": "Skill 2", "demand": 88, "growth": "+35%", "category": "Tech" }},
                    {{ "name": "Skill 3", "demand": 82, "growth": "+25%", "category": "Core" }},
                    {{ "name": "Skill 4", "demand": 78, "growth": "+40%", "category": "Tech" }},
                    {{ "name": "Skill 5", "demand": 75, "growth": "+15%", "category": "Core" }}
                  ],
                  "jobAlerts": [
                    {{
                      "id": 1,
                      "role": "Role Name",
                      "company": "Company Name",
                      "location": "City",
                      "salary": "₹10L - ₹15L",
                      "match": 95,
                      "posted": "2 days ago",
                      "tags": ["Tag1", "Tag2"],
                      "description": "Job description focusing on {domain} in India."
                    }},
                    {{ "id": 2, "role": "Role Name 2", "company": "Company 2", "location": "City 2", "salary": "₹8L - ₹12L", "match": 88, "posted": "1 week ago", "tags": ["Tag3"], "description": "Description." }},
                    {{ "id": 3, "role": "Role Name 3", "company": "Company 3", "location": "City 3", "salary": "₹12L - ₹18L", "match": 82, "posted": "3 days ago", "tags": ["Tag4"], "description": "Description." }}
                  ],
                  "pivotRecommendation": {{
                    "role": "Emerging {domain} Role",
                    "match": 85,
                    "description": "Career advice for pivoting into this role in India."
                  }},
                  "learningIntervention": {{
                    "plannedSkill": "Legacy/Standard Skill in {domain}",
                    "targetSkill": "Modern/Surging Tech in {domain}",
                    "increase": 40,
                    "rationale": "Write a 3-sentence narrative strictly about {domain}. Explain that while Indian students traditionally focused on '<plannedSkill>', our analysis of Indian industrial hubs shows a 40%+ surge in demand for '<targetSkill>'. Suggest a pivot in their learning strategy to master '<targetSkill>' for better placement outcomes."
                  }}
                }}
                
                CRITICAL: Every value must be related to {domain}. Randomize all numbers by +/- 20%.
                """
                
                headers = {
                    "Authorization": f"Bearer {OPENROUTER_API_KEY}",
                    "Content-Type": "application/json",
                    "HTTP-Referer": "http://localhost:3000", # Optional, for OpenRouter rankings
                    "X-Title": "Three Monkeys Career Pulse", # Optional
                }
                
                payload = {
                    "model": model_name,
                    "messages": [{"role": "user", "content": prompt}],
                    "temperature": 0.7
                }
                
                response = requests.post(
                    "https://openrouter.ai/api/v1/chat/completions",
                    headers=headers,
                    data=json.dumps(payload),
                    timeout=60 # OpenRouter free models can be slow
                )
                
                if response.status_code != 200:
                    error_msg = f"OpenRouter Error {response.status_code} with {model_name}: {response.text}"
                    print(f"❌ {error_msg}")
                    # Log to file for diagnostics
                    with open("openrouter_debug.log", "a") as f:
                        f.write(f"\n{model_name}: {response.status_code} - {response.text}")
                    last_error = error_msg
                    continue
                
                res_data = response.json()
                if not res_data.get('choices'):
                    print(f"Empty response from {model_name}")
                    continue
                    
                response_text = res_data['choices'][0]['message']['content'].strip()
                
                json_match = re.search(r'\{.*\}', response_text, re.DOTALL)
                if json_match:
                    response_text = json_match.group(0)
                    
                try:
                    data = json.loads(response_text)
                    print(f"Generated High-Variance Indian Data for {domain} using OpenRouter {model_name} (Seed: {salt})")
                    return jsonify(data)
                except json.JSONDecodeError as je:
                    print(f"JSON Decode Error with {model_name}: {str(je)}")
                    continue
                    
            except Exception as e:
                error_str = str(e)
                print(f"Error with {model_name}: {error_str}")
                last_error = error_str
                continue

        
        return jsonify({"error": f"All models failed. Last error: {last_error}"}), 500
            
    except Exception as e:
        error_msg = f"Backend Error for {domain}: {str(e)}"
        print(error_msg)
        import traceback
        traceback_print = traceback.format_exc()
        print(traceback_print)
        with open("backend_errors.log", "a", encoding="utf-8") as f:
            f.write(error_msg + "\n" + traceback_print + "\n")
        return jsonify({"error": str(e)}), 500

@app.route("/api/health", methods=["GET"])
def health_check():
    """Health check endpoint"""
    return jsonify({
        "status": "running",
        "gemini_api_configured": bool(GOOGLE_API_KEY)
    })

if __name__ == "__main__":
    port = int(os.getenv("PORT", 5000))
    print(f"🚀 Backend server starting on http://localhost:{port}")
    print(f"📊 Gemini API configured: {bool(GOOGLE_API_KEY)}")
    if not GOOGLE_API_KEY:
        print("⚠️  Add GOOGLE_API_KEY to .env file for real analysis")
    app.run(debug=True, port=port)
