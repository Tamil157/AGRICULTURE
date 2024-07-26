import React from "react";
import CropRecommendationcss from "../stylesheet/CropRecommendation.css"

export default function CropRecommendation() {
  return (
    <div className="container">
      <h1 className="header">Crop Recommendation</h1>
      <form className="form">
        <div className="form-group">
          <label className="label" htmlFor="temperature">
            Temperature (°C):
          </label>
          <input className="input" type="number" id="temperature" name="temperature" />
        </div>
        <div className="form-group">
          <label className="label" htmlFor="humidity">
            Humidity (%):
          </label>
          <input className="input" type="number" id="humidity" name="humidity" />
        </div>
        <div className="form-group">
          <label className="label" htmlFor="soilType">
            Soil Type:
          </label>
          <select className="select" id="soilType" name="soilType">
            <option value="sandy">Sandy</option>
            <option value="clay">Clay</option>
            <option value="silt">Silt</option>
            <option value="loamy">Loamy</option>
          </select>
        </div>
        <div className="form-group">
          <label className="label" htmlFor="rainfall">
            Annual Rainfall (mm):
          </label>
          <input className="input" type="number" id="rainfall" name="rainfall" />
        </div>
        <div className="form-group">
          <label className="label" htmlFor="phLevel">
            Soil pH Level:
          </label>
          <input className="input" type="number" step="0.1" id="phLevel" name="phLevel" />
        </div>
        <button className="button" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}
