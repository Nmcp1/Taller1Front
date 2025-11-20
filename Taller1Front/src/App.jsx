<<<<<<< HEAD
import { useState } from 'react'
import 'primeflex/primeflex.css';

function App() {
  const [count, setCount] = useState(0)
=======
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import LecturaForm from "./components/LecturaForm";
import LecturaView from "./components/LecturaView";
>>>>>>> 062c484f354db0b706ea8af2a6b3e7e447439619

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/registrar" element={<LecturaForm />} />
        <Route path="/ver-registro" element={<LecturaView />} />
      </Routes>
    </BrowserRouter>
  );
}