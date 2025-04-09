from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
from bs4 import BeautifulSoup

app = Flask(__name__)
CORS(app)  # Enable CORS to allow requests from your frontend

@app.route('/scrape', methods=['GET'])
def scrape():
    target_url = request.args.get('url')  # Get the URL from the query parameter
    if not target_url:
        return jsonify({'error': 'URL parameter is required'}), 400

    try:
        # Fetch the HTML content of the target URL
        headers = {'User-Agent': 'Mozilla/5.0'}  # Mimic a browser request
        response = requests.get(target_url, headers=headers)
        response.raise_for_status()  # Raise an error if the request fails

        # Parse the HTML using BeautifulSoup
        soup = BeautifulSoup(response.content, 'html.parser')

        # Extract specific elements (e.g., all <h1> tags)
        elements = [h1.get_text(strip=True) for h1 in soup.find_all('h1')]

        return jsonify({'elements': elements})  # Return the elements as JSON
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)