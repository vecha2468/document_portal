import google.generativeai as genai

genai.configure(api_key='AIzaSyAKce4Jqjl9DNT2utd8bA6Eb9VM-OYMi1s')

models = genai.list_models()
for model in models:
    print(model.name, model.supported_generation_methods)
