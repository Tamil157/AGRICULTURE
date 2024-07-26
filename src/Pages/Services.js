import React from "react";
import "../stylesheet/Services.css"
import Navbar from "../nav"
export default function Services(){
  return(
    <div className="service-sec">
      < Navbar />
      <section className="crop-recommend">
        <div className="image-wrap-L">
          <img className="weather-img" src={require("../images/weather.jpg")}/>
        </div>
        <div className="text-wrap">
          <p>Mollit ex Lorem duis fugiat in consectetur Lorem adipisicing sit ut.
             Nostrud commodo culpa est consequat in dolor ea aliqua duis et id
             .Deserunt reprehenderit cupidatat labore deserunt adipisicing.
          </p>
        </div>
        
      </section>
      
      <section className="weather-forecast">
          <div className="text-wrap-R">
            <p>Mollit ex Lorem duis fugiat in consectetur Lorem adipisicing sit ut.
              Nostrud commodo culpa est consequat in dolor ea aliqua duis et id
              .Deserunt reprehenderit cupidatat labore deserunt adipisicing.
            </p>
          </div>
            <div className="image-wrap-R">
              <img className="weather-img" src={require("../images/weather.jpg")}/>
            </div>
          
      </section>

      <section className="disease-prediction">
        <div className="image-wrap-L">
            <img className="weather-img" src={require("../images/weather.jpg")}/>
        </div>
          <div className="text-wrap">
            <p>Mollit ex Lorem duis fugiat in consectetur Lorem adipisicing sit ut.
              Nostrud commodo culpa est consequat in dolor ea aliqua duis et id
              .Deserunt reprehenderit cupidatat labore deserunt adipisicing.
            </p>
          </div>
      </section>

      <section className="fertilizer-guidance">
        <div className="text-wrap-R">
          <p>Mollit ex Lorem duis fugiat in consectetur Lorem adipisicing sit ut.
              Nostrud commodo culpa est consequat in dolor ea aliqua duis et id
              .Deserunt reprehenderit cupidatat labore deserunt adipisicing.
          </p>
        </div>
        <div className="image-wrap-R">
              <img className="weather-img" src={require("../images/weather.jpg")}/>
              </div>
      </section>

      <section className="selling-decision">
        <div className="image-wrap-L">
            <img className="weather-img" src={require("../images/weather.jpg")}/>
        </div>
        <div className="text-wrap">
            <p>Mollit ex Lorem duis fugiat in consectetur Lorem adipisicing sit ut.
               Nostrud commodo culpa est consequat in dolor ea aliqua duis et id
              .Deserunt reprehenderit cupidatat labore deserunt adipisicing.
            </p>
        </div>

      </section>
    </div>
  )
}