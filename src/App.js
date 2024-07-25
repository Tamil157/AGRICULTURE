import React from "react";
import { BrowserRouter,Routes,Route,Link } from "react-router-dom";
import Home from "./Home";
import About from "./Pages/About";
import Services from "./Pages/Services";

export default function App(){
  return(
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/about' element={<About />}/>
        <Route path='/services' element={<Services />}/>
      </Routes>
      </BrowserRouter>

    </>
  )
}