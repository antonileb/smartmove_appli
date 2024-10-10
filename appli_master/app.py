from flask import Flask, jsonify, request
from flask_cors import CORS  # Ajout de CORS
import google.generativeai as genai

app = Flask(__name__)
CORS(app)  # Permettre toutes les origines

# Configurer l'API de Google Generative AI
genai.configure(api_key="your-api-key2")

@app.route('/generate', methods=['POST'])
def generate_poem():
    data = request.get_json()  # Récupère les données JSON envoyées par le client
    user_input = data.get("text", "")  # Récupère le texte envoyé par l'utilisateur
    
    if not user_input:
        return jsonify({"error": "No input text provided"}), 400

    model = genai.GenerativeModel("gemini-1.5-flash")
    response = model.generate_content(user_input)
    
    # Renvoyer la réponse sous forme de JSON
    return jsonify({"response": response.text})

if __name__ == '__main__':
    app.run(debug=True)




