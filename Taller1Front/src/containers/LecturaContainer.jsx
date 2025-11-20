import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar";
import LecturaForm from "../components/LecturaForm";
import LecturaView from "../components/LecturaView";
import { createLectura, deleteLectura, getLecturas } from '../services/LecturaService';


function LecturaContainer() {
  const [lecturaData, setLecturaData] = useState([]);
  const handleCreate=(lectura)=>{
    createLectura(lectura);
    const data = getLecturas();
    setLecturaData(data);
  }

  const handleDelete=(id)=>{
    deleteLectura(id);
    const data = getLecturas();
    setLecturaData(data);
  }

  useEffect(()=>{
    const data = getLecturas();
    setLecturaData(data);
  }, []);

  return (
    <>
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path="/registrar" element={<LecturaForm onCreateLectura={handleCreate} />} />
          <Route path="/ver-registro" element={<LecturaView lecturaData={lecturaData} onDeleteLectura={handleDelete} />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default LecturaContainer
