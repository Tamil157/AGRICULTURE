import React from 'react';
import "../stylesheet/Services.css"
import Navbar from "../nav"


const services = [
  {
    name: 'Crop Recommendation',
    description: 'Get tailored crop recommendations based on your soil phosphorus, pH, and nitrogen levels to maximize yield and sustainability.',
  },
  {
    name: 'Weather Forecast',
    description: 'Access accurate weather forecasts to plan your farming activities and make informed decisions about irrigation and protection measures.',
  },
  {
    name: 'Disease Prediction',
    description: 'Use advanced image analysis to predict crop diseases early, receive guidance on preventive measures, and protect your crops effectively.',
  },
  {
    name: 'Fertilizer Guidance',
    description: "Get precise recommendations on the types and amounts of fertilizers to use based on your crop and soil conditions, enhancing growth and productivity.",
  },
  {
    name: 'Selling Decision',
    description: 'Receive insights on the best times and markets to sell your produce, helping you maximize your profits and reduce waste.',
  },
  {
    name: 'Vehicle Requirements',
    description: 'Determine the best types and quantities of farming vehicles needed for your operations, ensuring efficiency and cost-effectiveness.',
  },
];

function Services() {
  return (
    <div className='service-wrapper'>
    <Navbar />
    <div className="service-sec">
      <div className="cards">
        {services.map((services, index) => (
          <div className="card" key={index}>
            <h3>{services.name}</h3>
            <p>{services.description}</p>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
}

export default Services;
