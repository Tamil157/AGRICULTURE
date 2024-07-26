import React from "react";
import "../stylesheet/About.css"
import Navbar from "../nav"
export default function About(){
  return(
    <div className="about-wrapper">
    <Navbar />
    <div>
      <h1 className="abt-us">
        ABOUT US
      </h1>
      <p>
        Welcome to the TeamRookies' Farmer Support Platform.Our mission is to empower farmers with the knowledge and tools they need to overcome everyday challenges and achieve sustainable success. We are a dedicated team committed to bringing innovative solutions to the farming community, helping you make informed decisions and optimize your agricultural practices.
        Our platform offers a range of services, including crop prediction, weather forecasting, disease management, vehicle requirements, selling decision support, and fertilizer guidance. By leveraging the latest technology and data-driven insights, we aim to provide you with practical, actionable information tailored to your specific needs.
        At TeamRookies, we understand the importance of agriculture and the critical role farmers play in our society. We are here to support you every step of the way, ensuring you have access to the best resources and information available. Thank you for choosing our platform to help you thrive in your farming endeavors.
        Feel free to contact us with any questions or feedback as we continue to innovate and improve our services for the farming community.
      </p>
    </div>
    </div>
  )
}