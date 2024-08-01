import React, { useState } from 'react';
import axios from 'axios';
import './Crop.css';

const Crop = () => {
  const [prediction, setPrediction] = useState(null);
  const [solution, setSolution] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const fileInput = document.querySelector('input[type="file"]');
    const formData = new FormData();
    formData.append('file', fileInput.files[0]); // Corrected method name

    try {
      const response = await axios.post('http://127.0.0.1:5000/predict', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Extract prediction and solution from response
      const { prediction, solution } = response.data;

      // Update state with prediction and solution
      setPrediction(prediction);
      setSolution(solution);
      setError(null); // Clear any previous error
    } catch (error) {
      console.error('Error uploading file:', error);
      setError('Error uploading file. Please try again.');
      setPrediction(null);
      setSolution(null);
    }
  };

  return (
    <div className="Crop">
      <h2>Plant Disease Prediction</h2>
      <form onSubmit={handleSubmit}>
        <input type="file" />
        <button type="submit">Upload</button>
      </form>

      {error && <p className="error">{error}</p>}

      {prediction && (
        <div className="result">
          <h3>Prediction Result:</h3>
          <p>Disease: {prediction}</p>
          <p>Solution: {solution}</p>
        </div>
      )}
    </div>
  );
};

export default Crop;
