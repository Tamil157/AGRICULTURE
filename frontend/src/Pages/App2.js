import React, { useState } from 'react';
import axios from 'axios';

function App2() {
    const [cropInputs, setCropInputs] = useState({
        N: '',
        P: '',
        K: '',
        temperature: '',
        humidity: '',
        ph: '',
        rainfall: ''
    });

    const [fertilizerInputs, setFertilizerInputs] = useState({
        temperature: '',
        humidity: '',
        moisture: '',
        soilType: '',
        cropType: '',
        nitrogen: '',
        potassium: '',
        phosphorous: ''
    });

    const [cropPrediction, setCropPrediction] = useState('');
    const [fertilizerPrediction, setFertilizerPrediction] = useState('');
    const [error, setError] = useState('');

    const handleCropChange = (e) => {
        const { name, value } = e.target;
        setCropInputs(prev => ({ ...prev, [name]: value }));
    };

    const handleFertilizerChange = (e) => {
        const { name, value } = e.target;
        setFertilizerInputs(prev => ({ ...prev, [name]: value }));
    };

    const predictCrop = async () => {
        try {
            const data = Object.values(cropInputs).map(Number);
            const response = await axios.post('http://localhost:5000/predict_crop', { data });
            setCropPrediction(response.data.prediction);
            setError('');
        } catch (error) {
            console.error('Error predicting crop:', error.response ? error.response.data : error.message);
            setError(error.response ? error.response.data.error : 'Failed to get crop prediction');
        }
    };

    const predictFertilizer = async () => {
        try {
            const data = Object.values(fertilizerInputs).map(Number);
            const response = await axios.post('http://localhost:5000/predict_fertilizer', { data });
            setFertilizerPrediction(response.data.prediction);
            setError('');
        } catch (error) {
            console.error('Error predicting fertilizer:', error.response ? error.response.data : error.message);
            setError(error.response ? error.response.data.error : 'Failed to get fertilizer prediction');
        }
    };

    return (
        <div>
            <h1>Crop and Fertilizer Prediction</h1>
            
            <div>
                <h2>Crop Prediction</h2>
                {Object.keys(cropInputs).map(key => (
                    <input
                        key={key}
                        name={key}
                        type="text"
                        value={cropInputs[key]}
                        onChange={handleCropChange}
                        placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                    />
                ))}
                <button onClick={predictCrop}>Predict Crop</button>
                {cropPrediction && <p>Crop Prediction: {cropPrediction}</p>}
            </div>
            
            <div>
                <h2>Fertilizer Prediction</h2>
                {Object.keys(fertilizerInputs).map(key => (
                    <input
                        key={key}
                        name={key}
                        type="text"
                        value={fertilizerInputs[key]}
                        onChange={handleFertilizerChange}
                        placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                    />
                ))}
                <button onClick={predictFertilizer}>Predict Fertilizer</button>
                {fertilizerPrediction && <p>Fertilizer Prediction: {fertilizerPrediction}</p>}
            </div>
            
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
}

export default App2;
