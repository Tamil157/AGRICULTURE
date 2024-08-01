from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import json
import numpy as np
from PIL import Image
import tensorflow as tf
import pickle
import logging
import traceback

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})  # Allow all origins

# Configure logging
logging.basicConfig(level=logging.DEBUG)

# Load crop and fertilizer models
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

# Load plant disease prediction model and class indices
working_dir = os.path.dirname(os.path.abspath(__file__))
model_path = os.path.join(working_dir, 'trained_model', 'plant_disease_prediction_model.h5')
model = tf.keras.models.load_model(model_path)
class_indices = json.load(open(os.path.join(working_dir, 'trained_model', 'class_indices.json')))

# Define disease solutions
disease_solutions = {
     "Apple___Apple_scab": "1. Prune and destroy infected leaves and branches.\n2. Apply fungicides during the growing season.",
    "Apple___Black_rot": "1. Remove and destroy infected plant parts.\n2. Apply fungicides before symptoms appear.",
    "Apple___Cedar_apple_rust": "1. Plant resistant cultivars.\n2. Remove nearby cedar trees if possible.\n3. Apply fungicides preventatively.",
    "Apple___healthy": "No specific treatment required. Maintain good orchard management practices.",
    "Blueberry___healthy": "No specific treatment required. Maintain good plant care practices.",
    "Cherry_(including_sour)___Powdery_mildew": "1. Prune to improve air circulation.\n2. Apply fungicides early in the season.",
    "Cherry_(including_sour)___healthy": "No specific treatment required. Maintain good orchard management practices.",
    "Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot": "1. Rotate crops to reduce disease pressure.\n2. Apply fungicides when necessary.",
    "Corn_(maize)___Common_rust_": "1. Plant resistant varieties.\n2. Apply fungicides preventatively.",
    "Corn_(maize)___Northern_Leaf_Blight": "1. Rotate crops to reduce disease pressure.\n2. Apply fungicides when necessary.",
    "Corn_(maize)___healthy": "No specific treatment required. Maintain good crop management practices.",
    "Grape___Black_rot": "1. Remove and destroy infected plant parts.\n2. Apply fungicides preventatively.",
    "Grape___Esca_(Black_Measles)": "1. Prune infected vines.\n2. Apply fungicides at specific times during the growing season.",
    "Grape___Leaf_blight_(Isariopsis_Leaf_Spot)": "1. Apply fungicides preventatively.\n2. Prune to improve air circulation.",
    "Grape___healthy": "No specific treatment required. Maintain good vineyard management practices.",
    "Orange___Haunglongbing_(Citrus_greening)": "1. Remove and destroy infected trees.\n2. Control psyllid vectors.\n3. Use antibiotics in affected areas.",
    "Peach___Bacterial_spot": "1. Remove and destroy infected plant parts.\n2. Apply copper-based fungicides.",
    "Peach___healthy": "No specific treatment required. Maintain good orchard management practices.",
    "Pepper,_bell___Bacterial_spot": "1. Remove and destroy infected plant parts.\n2. Apply copper-based fungicides.",
    "Pepper,_bell___healthy": "No specific treatment required. Maintain good plant care practices.",
    "Potato___Early_blight": "1. Remove and destroy infected plant parts.\n2. Apply fungicides preventatively.",
    "Potato___Late_blight": "1. Remove and destroy infected plant parts.\n2. Apply fungicides preventatively.",
    "Potato___healthy": "No specific treatment required. Maintain good crop management practices.",
    "Raspberry___healthy": "No specific treatment required. Maintain good plant care practices.",
    "Soybean___healthy": "No specific treatment required. Maintain good crop management practices.",
    "Squash___Powdery_mildew": "1. Apply fungicides preventatively.\n2. Plant resistant varieties.",
    "Strawberry___Leaf_scorch": "1. Remove and destroy infected plant parts.\n2. Apply fungicides preventatively.",
    "Strawberry___healthy": "No specific treatment required. Maintain good plant care practices.",
    "Tomato___Bacterial_spot": "1. Remove and destroy infected plant parts.\n2. Apply copper-based fungicides.",
    "Tomato___Early_blight": "1. Remove and destroy infected plant parts.\n2. Apply fungicides preventatively.",
    "Tomato___Late_blight": "1. Remove and destroy infected plant parts.\n2. Apply fungicides preventatively.",
    "Tomato___Leaf_Mold": "1. Improve air circulation.\n2. Apply fungicides preventatively.",
    "Tomato___Septoria_leaf_spot": "1. Remove and destroy infected plant parts.\n2. Apply fungicides preventatively.",
    "Tomato___Spider_mites Two-spotted_spider_mite": "1. Use insecticidal soap or neem oil to control mites.\n2. Prune infested leaves.",
    "Tomato___Target_Spot": "1. Remove and destroy infected plant parts.\n2. Apply fungicides preventatively.",
    "Tomato___Tomato_Yellow_Leaf_Curl_Virus": "1. Control whiteflies, which transmit the virus.\n2. Remove and destroy infected plants.",
    "Tomato___Tomato_mosaic_virus": "1. Control aphids, which can transmit the virus.\n2. Remove and destroy infected plants.",
    "Tomato___healthy": "No specific treatment required. Maintain good plant care practices."
    # Add more solutions as needed
}

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

# Ensure uploads directory exists
uploads_dir = os.path.join(working_dir, 'uploads')
os.makedirs(uploads_dir, exist_ok=True)

def load_and_preprocess_image(image_path, target_size=(224, 224)):
    img = Image.open(image_path)
    img = img.resize(target_size)
    img_array = np.array(img)
    img_array = np.expand_dims(img_array, axis=0)
    img_array = img_array.astype('float32') / 255.
    return img_array

def predict_image_class(model, image_path, class_indices):
    preprocessed_img = load_and_preprocess_image(image_path)
    predictions = model.predict(preprocessed_img)
    predicted_class_index = np.argmax(predictions, axis=1)[0]
    predicted_class_name = class_indices.get(str(predicted_class_index), 'Unknown')
    return predicted_class_name

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

        prediction_value = prediction[0]
        crop_name = crop_dict.get(prediction_value, "Unknown crop")
        logging.debug(f"Crop name: {crop_name}")

        return jsonify({'prediction': crop_name})
    except Exception as e:
        logging.error(f"Error during crop prediction: {str(e)}")
        traceback.print_exc()
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

        prediction_value = prediction[0]
        fertilizer_name = fertilizer_dict.get(prediction_value, "Unknown fertilizer")
        logging.debug(f"Fertilizer name: {fertilizer_name}")

        return jsonify({'prediction': fertilizer_name})
    except Exception as e:
        logging.error(f"Error during fertilizer prediction: {str(e)}")
        traceback.print_exc()
        return jsonify({'error': str(e)}), 500

@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({'error': 'No file uploaded'}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No file selected'}), 400

    file_path = os.path.join(uploads_dir, file.filename)
    file.save(file_path)

    prediction = predict_image_class(model, file_path, class_indices)
    solution = disease_solutions.get(prediction, "No solution found for the predicted disease.")

    return jsonify({'prediction': prediction, 'solution': solution})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
