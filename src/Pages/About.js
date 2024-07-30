import React, { useState } from "react";
import "../stylesheet/About.css"
import Navbar from "../nav"

export default function About() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="about-wrapper">
      <Navbar />
      <div>
        <h1 className="abt-us">
          ABOUT US
        </h1>
        
        <p className="abt-cnt">
          Welcome to the TeamRookies' Farmer Support Platform.Our mission is to empower farmers with the knowledge and tools they need to overcome everyday challenges and achieve sustainable success. We are a dedicated team committed to bringing innovative solutions to the farming community, helping you make informed decisions and optimize your agricultural practices.
          Our platform offers a range of services, including crop prediction, weather forecasting, disease management, vehicle requirements, selling decision support, and fertilizer guidance. By leveraging the latest technology and data-driven insights, we aim to provide you with practical, actionable information tailored to your specific needs.
          At TeamRookies, we understand the importance of agriculture and the critical role farmers play in our society. We are here to support you every step of the way, ensuring you have access to the best resources and information available. Thank you for choosing our platform to help you thrive in your farming endeavors.
          Feel free to contact us with any questions or feedback as we continue to innovate and improve our services for the farming community.
        </p>
        <button className="contact-button" onClick={openModal}>Contact Us</button>
      </div>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <h2>Contact Us</h2>
            <form action="https://formsubmit.co/vigneshvicky84321@gmail.com" method="POST">
              <label>
                Name:
                <input type="text" name="name" required/>
              </label>
              <label>
                Mobile:
                <input type="text" name="mobile" />
              </label>
              <label>
                Review/Complaint:
                <textarea name="review"></textarea>
              </label>
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
