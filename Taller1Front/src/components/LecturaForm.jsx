import React, { useRef, useState } from 'react'
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { Editor } from 'primereact/editor';
import { InputNumber } from 'primereact/inputnumber';
import { RadioButton } from 'primereact/radiobutton';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { useNavigate } from "react-router-dom";

function LecturaForm({ onCreateLectura = () => {} }) {
    const toast = useRef(null);
    const navigate = useNavigate();

    const medidores = ["01","02","03","04","05","06","07","08","09","10"];
    const tipoMedidas = [
        { key: 1, label: "KiloWatts"},
        { key: 2, label: "Watts"},
        { key: 3, label: "Temperatura"}
    ];

    const [fecha, setFecha] = useState("");
    const [medidor, setMedidor] = useState(medidores[0]);
    const [direccion, setDireccion] = useState("");
    const [valor, setValor] = useState("");
    const [tipoMedida, setTipoMedida] = useState(tipoMedidas[0].label);

    const handleClick = () => {
        const direccion2 = direccion.replace(/<[^>]+>/g, "").trim();
        const fechaChile = new Date(fecha.getTime() - 3 * 60 * 60 * 1000)
            .toISOString()
            .slice(0,19) + "-03:00";

        const lecturaObj = { fecha: fechaChile, medidor, direccion: direccion2, valor, tipoMedida };

        let errores = [];
        if (!fecha) errores.push("Fecha no válida");
        if (!direccion2) errores.push("Direccion no válida");
        if (!valor) errores.push("Valor no válido");

        if (errores.length > 0) {
            toast.current.show({
                severity: "error",
                summary: "ERROR: " + errores.join(" | ")
            });
            return;
        }

        onCreateLectura(lecturaObj);

        toast.current.show({
            severity: "success",
            summary: "Lectura registrada",
            life: 1200
        });

        setTimeout(() => {
            navigate("/ver-registro");
        }, 1000);
    };

    return (
        <div className="p-4 surface-card shadow-2 border-round">
            <Toast ref={toast} />

            <div className="mb-4">
                <label className="font-medium block mb-2">Fecha</label>
                <Calendar 
                    value={fecha} 
                    onChange={(e) => setFecha(e.value)} 
                    dateFormat="dd-mm-yy" 
                    showTime 
                    className="w-full"
                />
            </div>

            <div className="mb-4">
                <label className="font-medium block mb-2">Medidor</label>
                <Dropdown 
                    value={medidor} 
                    onChange={(e) => setMedidor(e.value)} 
                    options={medidores} 
                    className="w-full" 
                />
            </div>

            <div className="mb-4">
                <label className="font-medium block mb-2">Dirección</label>
                <Editor 
                    value={direccion} 
                    onTextChange={(e) => setDireccion(e.textValue)} 
                    style={{ height: '220px' }} 
                />
            </div>

            <div className="mb-4">
                <label className="font-medium block mb-2">Valor</label>
                <InputNumber 
                    min="0"
                    max="500"
                    value={valor}
                    onValueChange={(e) => setValor(e.value)}
                    className="w-full"
                />
            </div>

            <div className="mb-4">
                <label className="font-medium block mb-2">Tipo de Medida</label>
                <div className="flex gap-4">
                    {tipoMedidas.map((item) => (
                        <div key={item.key} className="flex align-items-center gap-2">
                            <RadioButton
                                inputId={item.key}
                                name="tipoMedida"
                                value={item.label}
                                onChange={(e) => setTipoMedida(e.value)}
                                checked={tipoMedida === item.label}
                            />
                            <label htmlFor={item.key}>{item.label}</label>
                        </div>
                    ))}
                </div>
            </div>

            <Button 
                onClick={handleClick}
                rounded
                severity="info"
                label="Registrar Lectura"
                className="w-full"
            />
        </div>
    );
}

export default LecturaForm;
