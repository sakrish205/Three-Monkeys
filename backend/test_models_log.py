import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

with open("backend_model_test.log", "w") as log:
    def try_model(name):
        log.write(f"Testing {name}...\n")
        try:
            model = genai.GenerativeModel(name)
            response = model.generate_content("Hello")
            log.write(f"SUCCESS with {name}\n")
        except Exception as e:
            log.write(f"ERROR with {name}: {e}\n")

    try_model("gemini-1.5-flash")
    try_model("gemini-1.5-flash-001")
    try_model("gemini-1.5-pro")
    try_model("gemini-pro")
    try_model("gemini-2.0-flash")
