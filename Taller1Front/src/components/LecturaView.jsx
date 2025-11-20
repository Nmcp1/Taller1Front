import React, { useEffect, useState, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";

function LecturaView({ lecturaData, onDeleteLectura = () => {} }) {
  const [lecturas, setLecturas] = useState([]);
  const [filteredLecturas, setFilteredLecturas] = useState([]);
  const [tipoFiltro, setTipoFiltro] = useState("ALL");

  const toast = useRef(null);

  useEffect(() => {
    setLecturas(lecturaData);
    setFilteredLecturas(lecturaData);
  }, [lecturaData]);

  useEffect(() => {
    if (tipoFiltro === "ALL") {
      setFilteredLecturas(lecturas);
    } else {
      setFilteredLecturas(lecturas.filter((l) => l.tipo === tipoFiltro));
    }
  }, [tipoFiltro, lecturas]);

  const eliminarLectura = (id) => {
    onDeleteLectura(id);
    setLecturas(lecturaData);

    toast.current.show({
      severity: "success",
      summary: "Listo",
      detail: "La lectura se borró con éxito",
      life: 1800,
    });
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

  const valorTemplate = (rowData) => `${rowData.valor} ${rowData.tipo}`;

  return (
    <div className="p-4">
      <Toast ref={toast} position="bottom-right" />

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
        <Column field="tipo" header="Tipo" />
        <Column header="Valor" body={valorTemplate} />
        <Column header="Acciones" body={accionesTemplate} />
      </DataTable>
    </div>
  );
}

export default LecturaView;