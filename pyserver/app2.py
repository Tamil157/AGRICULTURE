from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import numpy as np
import logging
import traceback

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})  # Allow all origins

# Configure logging
logging.basicConfig(level=logging.DEBUG)

# Load models
try:
    with open('C:/machine_learning/plant-disease-prediction/crop.pkl', 'rb') as f:
        crop_model = pickle.load(f)
except Exception as e:
    logging.error(f"Error loading crop model: {str(e)}")
    crop_model = None

try:
    with open('C:/machine_learning/plant-disease-prediction/fertilizer.pkl', 'rb') as f:
        fertilizer_model = pickle.load(f)
except Exception as e:
    logging.error(f"Error loading fertilizer model: {str(e)}")
    fertilizer_model = None

# Dictionaries for mapping model predictions to names
fertilizer_dict = {
    0: 'Urea',
    1: 'DAP',
    2: '14-35-14',
    3: '28-28',
    4: '17-17-17',
    5: '20-20'
}

crop_dict = {
    0: 'rice',
    1: 'maize',
    2: 'chickpea',
    3: 'kidneybeans',
    4: 'pigeonpeas',
    5: 'mothbeans',
    6: 'mungbean',
    7: 'blackgram',
    8: 'lentil',
    9: 'pomegranate',
    10: 'banana',
    11: 'mango',
    12: 'grapes',
    13: 'watermelon',
    14: 'muskmelon',
    15: 'apple',
    16: 'orange',
    17: 'papaya',
    18: 'coconut',
    19: 'cotton',
    20: 'jute',
    21: 'coffee'
}

@app.route('/predict_crop', methods=['POST'])
def predict_crop():
    try:
        data = request.json['data']
        logging.debug(f"Received crop data: {data}")
        if not isinstance(data, list):
            raise ValueError("Data should be a list")
        if len(data) != 7:
            raise ValueError("Data should contain 7 elements")
        data = np.array(data).reshape(1, -1)
        logging.debug(f"Reshaped data: {data}")
        prediction = crop_model.predict(data)
        logging.debug(f"Crop prediction: {prediction}")

        # Map the prediction to the corresponding crop name
        prediction_value = prediction[0]
        crop_name = crop_dict.get(prediction_value, "Unknown crop")
        logging.debug(f"Crop name: {crop_name}")

        return jsonify({'prediction': crop_name})
    except Exception as e:
        logging.error(f"Error during crop prediction: {str(e)}")
        traceback.print_exc()  # Print the stack trace
        return jsonify({'error': str(e)}), 500

@app.route('/predict_fertilizer', methods=['POST'])
def predict_fertilizer():
    try:
        data = request.json['data']
        logging.debug(f"Received fertilizer data: {data}")
        if not isinstance(data, list):
            raise ValueError("Data should be a list")
        if len(data) != 8:
            raise ValueError("Data should contain 8 elements")
        data = np.array(data).reshape(1, -1)
        logging.debug(f"Reshaped data: {data}")
        prediction = fertilizer_model.predict(data)
        logging.debug(f"Fertilizer prediction: {prediction}")

        # Map the prediction to the corresponding fertilizer name
        prediction_value = prediction[0]
        fertilizer_name = fertilizer_dict.get(prediction_value, "Unknown fertilizer")
        logging.debug(f"Fertilizer name: {fertilizer_name}")

        return jsonify({'prediction': fertilizer_name})
    except Exception as e:
        logging.error(f"Error during fertilizer prediction: {str(e)}")
        traceback.print_exc()  # Print the stack trace
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')  # Allow connections from any host
