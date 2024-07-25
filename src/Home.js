import React from "react";
import Navbar from "./nav";
import "./stylesheet/Home.css"

export default function Home(){
  return(
    <div className="parent-wrap">
      <Navbar />
      <section className="Home-sec">
      </section>
      <footer className="footer">
        <p>*2024 TeamRookies</p>
        <p>All right are reserved</p>
      </footer>
    </div>
  )
}