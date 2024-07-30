import React, { useState } from "react";
import "../stylesheet/Services.css";
import Navbar from "../nav";
import tractorimg from "../images/tractor img.png";

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
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    date: "",
    address: ""
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted: ", formData);
    setIsModalOpen(false);
    // Add your form submission logic here
  };

  return (
    <div className='service-wrapper'>
      <Navbar />
      <div className="service-sec1">
        <div className="cards">
          {services.map((service, index) => (
            <div className="card" key={index}>
              <h3>{service.name}</h3>
              <p>{service.description}</p>
            </div>
          ))}
        </div>
      </div>
      <section className='service-sec2'>
        <div className="description-and-image">
          <div className="description-container">
            <p>Ready to get started with your farming tasks? Booking a tractor with us is quick and easy. Simply fill out the form below with your details, and we’ll ensure you have the right equipment when you need it.</p>
            <button onClick={() => setIsModalOpen(true)}>Book Now</button>
          </div>
          <img className='tractor-img' src={tractorimg} alt="Tractor" />
        </div>
      </section>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setIsModalOpen(false)}>&times;</span>
            <h1>Tractor Rental Form</h1>
            <form onSubmit={handleSubmit}>
              <label>
                Name:
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Mobile:
                <input
                  type="text"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Date for Work:
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Address:
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </label>
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Services;