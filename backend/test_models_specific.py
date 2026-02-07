import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

try:
    print("Testing gemini-2.0-flash...")
    model = genai.GenerativeModel("gemini-2.0-flash")
    response = model.generate_content("Hello")
    print("Success with gemini-2.0-flash")
except Exception as e:
    print(f"Error with gemini-2.0-flash: {e}")

try:
    print("Testing gemini-1.5-flash-latest...")
    model = genai.GenerativeModel("gemini-1.5-flash-latest")
    response = model.generate_content("Hello")
    print("Success with gemini-1.5-flash-latest")
except Exception as e:
    print(f"Error with gemini-1.5-flash-latest: {e}")
