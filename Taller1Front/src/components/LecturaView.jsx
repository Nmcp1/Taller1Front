import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";

function LecturaView({lecturaData}) {
  const [lecturas, setLecturas] = useState([]);
  const [filteredLecturas, setFilteredLecturas] = useState([]);
  const [tipoFiltro, setTipoFiltro] = useState("ALL");

  useEffect(() => {
    const datosBase = [
      { id: 1, fecha: "2024-11-20", hora: "14:22", medidor: "01", tipo: "kW", valor: 150 },
      { id: 2, fecha: "2024-11-20", hora: "10:10", medidor: "02", tipo: "W", valor: 930 },
      { id: 3, fecha: "2024-11-19", hora: "09:00", medidor: "03", tipo: "C", valor: 22 }
    ];

    setLecturas(lecturaData);
    setFilteredLecturas(lecturaData);
  }, []);

  useEffect(() => {
    if (tipoFiltro === "ALL") {
      setFilteredLecturas(lecturas);
    } else {
      setFilteredLecturas(lecturas.filter(l => l.tipo === tipoFiltro));
    }
  }, [tipoFiltro, lecturas]);

  const eliminarLectura = (id) => {
    const updated = lecturas.filter(l => l.id !== id);
    setLecturas(updated);
  };

  const accionesTemplate = (rowData) => (
    <Button
      label="Descartar Lectura"
      icon="pi pi-trash"
      severity="danger"
      onClick={() => eliminarLectura(rowData.id)}
    />
  );

  const tipos = [
    { label: "Todos", value: "ALL" },
    { label: "Kilowatts", value: "kW" },
    { label: "Watts", value: "W" },
    { label: "Temperatura", value: "C" }
  ];

  const valorTemplate = (rowData) => {
    const unidad =
      rowData.tipo === "Kilowatts" ? "kW" :
      rowData.tipo === "Watts" ? "W" :
      rowData.tipo === "Temperatura" ? "C" : "";
    return `${rowData.valor} ${unidad}`;
  };

  return (
    <div className="p-4">
      <div className="flex gap-3 mb-3">
        <Dropdown
          value={tipoFiltro}
          options={tipos}
          onChange={(e) => setTipoFiltro(e.value)}
          style={{ width: "240px" }}
        />
      </div>

      <DataTable value={filteredLecturas} paginator rows={5} sortField="fecha" sortOrder={-1}>
        <Column field="fecha" header="Fecha" sortable />
        <Column field="hora" header="Hora" />
        <Column field="medidor" header="Medidor" />
        <Column field="tipo" header="tipo" />
        <Column header="Valor" body={valorTemplate} />
        <Column header="Acciones" body={accionesTemplate} />
      </DataTable>
    </div>
  );
}

export default LecturaView;