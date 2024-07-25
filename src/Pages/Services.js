import React from "react";
import "../stylesheet/Services.css"
import Navbar from "../nav"
export default function Services(){
  return(
    <div className="service-sec">
      < Navbar />
      <section className="crop-recommend">
        <div className="image-wrap">
          <img className="weather-img" src={require("../images/weather.jpg")}/>
        </div>
        <div></div>
      </section>
      <section className="weather-forecast"></section>
      <section className="disease-prediction"></section>
      <section className="fertilizer-guidance"></section>
      <section className="selling-decision"></section>
    </div>
  )
}