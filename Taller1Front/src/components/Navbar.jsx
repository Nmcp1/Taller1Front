import { Menubar } from "primereact/menubar";
import { useNavigate, useLocation } from "react-router-dom";
import "../index.scss";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const items = [
    {
      label: "Registrar",
      icon: "pi pi-plus",
      command: () => navigate("/registrar"),
      className: location.pathname === "/registrar" ? "active-menu" : ""
    },
    {
      label: "Ver Registro",
      icon: "pi pi-list",
      command: () => navigate("/ver-registro"),
      className: location.pathname === "/ver-registro" ? "active-menu" : ""
    }
  ];

  const start = <div className="navbar-title">Sanquinta</div>;

  return (
    <div className="navbar-wrapper">
      <Menubar model={items} start={start} className="custom-menubar" />
    </div>
  );
}
