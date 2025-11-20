import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar";
import LecturaForm from "../components/LecturaForm";
import LecturaView from "../components/LecturaView";
import { createLectura, getLecturas } from '../services/LecturaService';


function LecturaContainer() {
  const [lecturaData, setLecturaData] = useState([]);
  const handleCreate=(lectura)=>{
    createLectura(lectura);
    const data = getLecturas();
    setLecturaData(data);
  }

  useEffect(()=>{
    const data = getLecturas();
    setLecturaData(data);
  }, []);

  return (
    <div>
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/registrar" element={<LecturaForm onCreateLectura={handleCreate}></LecturaForm>} />
        <Route path="/ver-registro" element={<LecturaView lecturaData={lecturaData}></LecturaView>} />
      </Routes>
    </BrowserRouter>
    </div>
  )
}

export default LecturaContainer
