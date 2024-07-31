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
        setCropInputs({
            ...cropInputs,
            [name]: value
        });
    };

    const handleFertilizerChange = (e) => {
        const { name, value } = e.target;
        setFertilizerInputs({
            ...fertilizerInputs,
            [name]: value
        });
    };

    const predictCrop = async () => {
        try {
            const data = Object.values(cropInputs);
            console.log('Sending crop data:', data);  // Log the data being sent
            const response = await axios.post('http://127.0.0.1:5000/predict_crop', { data });
            setCropPrediction(response.data.prediction);
            setError(''); // Clear any previous errors
        } catch (error) {
            console.error('Error predicting crop:', error);
            setError('Failed to get crop prediction');
        }
    };

    const predictFertilizer = async () => {
        try {
            const data = Object.values(fertilizerInputs);
            console.log('Sending fertilizer data:', data);  // Log the data being sent
            const response = await axios.post('http://127.0.0.1:5000/predict_fertilizer', { data });
            setFertilizerPrediction(response.data.prediction);
            setError(''); // Clear any previous errors
        } catch (error) {
            console.error('Error predicting fertilizer:', error);
            setError('Failed to get fertilizer prediction');
        }
    };

    return (
        <div>
            <h1>Crop and Fertilizer Prediction</h1>
            
            <div>
                <h2>Crop Prediction</h2>
                <input name="N" type="text" value={cropInputs.N} onChange={handleCropChange} placeholder="N" />
                <input name="P" type="text" value={cropInputs.P} onChange={handleCropChange} placeholder="P" />
                <input name="K" type="text" value={cropInputs.K} onChange={handleCropChange} placeholder="K" />
                <input name="temperature" type="text" value={cropInputs.temperature} onChange={handleCropChange} placeholder="Temperature" />
                <input name="humidity" type="text" value={cropInputs.humidity} onChange={handleCropChange} placeholder="Humidity" />
                <input name="ph" type="text" value={cropInputs.ph} onChange={handleCropChange} placeholder="pH" />
                <input name="rainfall" type="text" value={cropInputs.rainfall} onChange={handleCropChange} placeholder="Rainfall" />
                <button onClick={predictCrop}>Predict Crop</button>
                {cropPrediction && <p>Crop Prediction: {cropPrediction}</p>}
            </div>
            
            <div>
                <h2>Fertilizer Prediction</h2>
                <input name="temperature" type="text" value={fertilizerInputs.temperature} onChange={handleFertilizerChange} placeholder="Temperature" />
                <input name="humidity" type="text" value={fertilizerInputs.humidity} onChange={handleFertilizerChange} placeholder="Humidity" />
                <input name="moisture" type="text" value={fertilizerInputs.moisture} onChange={handleFertilizerChange} placeholder="Moisture" />
                <input name="soilType" type="text" value={fertilizerInputs.soilType} onChange={handleFertilizerChange} placeholder="Soil Type" />
                <input name="cropType" type="text" value={fertilizerInputs.cropType} onChange={handleFertilizerChange} placeholder="Crop Type" />
                <input name="nitrogen" type="text" value={fertilizerInputs.nitrogen} onChange={handleFertilizerChange} placeholder="Nitrogen" />
                <input name="potassium" type="text" value={fertilizerInputs.potassium} onChange={handleFertilizerChange} placeholder="Potassium" />
                <input name="phosphorous" type="text" value={fertilizerInputs.phosphorous} onChange={handleFertilizerChange} placeholder="Phosphorous" />
                <button onClick={predictFertilizer}>Predict Fertilizer</button>
                {fertilizerPrediction && <p>Fertilizer Prediction: {fertilizerPrediction}</p>}
            </div>
            
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
}

export default App2;
