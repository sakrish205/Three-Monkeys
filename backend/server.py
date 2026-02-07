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

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)  # Enable CORS for React frontend

# Configure Gemini API
GOOGLE_API_KEY = os.getenv("GOOGLE_API_KEY")
if not GOOGLE_API_KEY:
    print("WARNING: GOOGLE_API_KEY not found in environment variables")
    print("Create a .env file with: GOOGLE_API_KEY=your_api_key_here")
else:
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

def analyze_with_gemini(resume_text, job_description=""):
    """Analyze resume using Google Gemini API with model fallback"""
    # List of models to try in order of preference
    # Note: trying 2.0 first as it might be available for this key
    models_to_try = [
        "gemini-2.5-flash",
        "gemini-2.5-pro",
        "gemini-2.0-flash",
        "gemini-1.5-flash",
        "gemini-1.5-flash-latest",
        "gemini-1.5-pro",
        "gemini-pro",
        "gemini-2.0-flash-exp",
    ]
    
    last_error = None
    
    for model_name in models_to_try:
        try:
            print(f"Trying model: {model_name}...")
            model = genai.GenerativeModel(model_name)
            
            # Create analysis prompt focused on Mechanical Engineering
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
            
            response = model.generate_content(prompt)
            if not response:
                print(f"Model {model_name} returned no response.")
                continue
                
            response_text = response.text.strip()
            
            # Extract JSON from response (sometimes Gemini adds markdown formatting)
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
            print(error_msg)
            last_error = str(e)
            # Log to file but continue trying other models
            with open("backend_model_errors.log", "a", encoding="utf-8") as f:
                f.write(f"{model_name}: {error_msg}\n")
            continue
            
    # If we get here, all models failed
    print("All models failed.")
    if last_error:
        # Log the final failure
        with open("backend_errors.log", "a", encoding="utf-8") as f:
            f.write(f"All models failed. Last error: {last_error}\n")
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
        
        # Analyze with Gemini API
        if GOOGLE_API_KEY:
            analysis = analyze_with_gemini(resume_text, job_description)
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
                "error": "GOOGLE_API_KEY not configured. Please add your Gemini API key to .env file",
                "note": "Get API key from: https://makersuite.google.com/app/apikey"
            }), 503
            
    except Exception as e:
        error_msg = f"Error in analyze_resume endpoint: {str(e)}"
        print(error_msg)
        with open("backend_errors.log", "a", encoding="utf-8") as f:
            f.write(error_msg + "\n")
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
