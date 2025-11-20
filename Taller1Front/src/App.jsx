import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import LecturaForm from "./components/LecturaForm";
import LecturaView from "./components/LecturaView";

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