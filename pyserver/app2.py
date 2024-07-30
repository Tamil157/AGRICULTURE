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
        # Convert numpy types to native Python types
        prediction = prediction.tolist()  # Converts the array to a Python list
        return jsonify({'prediction': prediction[0]})
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
        # Convert numpy types to native Python types
        prediction = prediction.tolist()  # Converts the array to a Python list
        return jsonify({'prediction': prediction[0]})
    except Exception as e:
        logging.error(f"Error during fertilizer prediction: {str(e)}")
        traceback.print_exc()  # Print the stack trace
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')  # Allow connections from any host
