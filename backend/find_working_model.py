import google.generativeai as genai
import os
from dotenv import load_dotenv

load_dotenv()
api_key = os.getenv("GOOGLE_API_KEY")
genai.configure(api_key=api_key)

print("Listing models...")
try:
    models = []
    for m in genai.list_models():
        if 'generateContent' in m.supported_generation_methods:
            models.append(m.name)
            print(f"Found: {m.name}")
    
    print("\nTesting models for connectivity...")
    working_model = None
    
    # Prioritize flash models for speed
    priority_order = [
        'models/gemini-1.5-flash',
        'models/gemini-1.5-flash-latest',
        'models/gemini-2.0-flash-exp', 
        'models/gemini-2.0-flash',
        'models/gemini-1.5-pro',
        'models/gemini-pro'
    ]
    
    # Sort models based on priority
    # Note: the models list contains full resource names like 'models/gemini-1.5-flash'
    
    test_queue = [m for m in priority_order if m in models] + [m for m in models if m not in priority_order]
    
    for model_name in test_queue:
        print(f"Testing {model_name}...")
        try:
            model = genai.GenerativeModel(model_name)
            response = model.generate_content("Hello, simply reply 'OK'.")
            if response and response.text:
                print(f"SUCCESS! {model_name} is working.")
                working_model = model_name
                break
        except Exception as e:
            print(f"FAILED {model_name}: {e}")
            
    if working_model:
        print(f"\nRECOMMENDED MODEL: {working_model}")
        # Strip 'models/' prefix for the GenerativeModel constructor if needed, though it handles both
        short_name = working_model.replace('models/', '')
        print(f"Use this in server.py: '{short_name}'")
    else:
        print("\nNO WORKING MODELS FOUND.")

except Exception as e:
    print(f"Error listing/testing models: {e}")
