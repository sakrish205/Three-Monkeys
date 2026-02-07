import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

def try_model(name):
    print(f"Testing {name}...")
    try:
        model = genai.GenerativeModel(name)
        response = model.generate_content("Hello")
        print(f"SUCCESS with {name}")
    except Exception as e:
        print(f"ERROR with {name}: {e}")

try_model("gemini-1.5-flash")
try_model("gemini-1.5-flash-latest")
try_model("gemini-1.5-pro")
try_model("gemini-pro")
