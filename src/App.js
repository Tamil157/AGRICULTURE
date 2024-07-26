import React from "react";
import { BrowserRouter,Routes,Route,Link } from "react-router-dom";
import Home from "./Home";
import About from "./Pages/About";
import Services from "./Pages/Services";
import Crop_recommend from "./Pages/Crop_recommend";

export default function App(){
  return(
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/about' element={<About />}/>
        <Route path='/services' element={<Services />}/>
        <Route path='/crop_recommend' element={<Crop_recommend />}/>
      </Routes>
      </BrowserRouter>

    </>
  )
}