import React, { useRef, useState } from 'react'
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { Editor } from 'primereact/editor';
import { InputNumber } from 'primereact/inputnumber';
import { RadioButton } from 'primereact/radiobutton';
import { Button } from 'primereact/button';
import {Toast} from 'primereact/toast';
        
        

function LecturaForm({onCreateLectura = () =>{}}) {
  const toast = useRef(null);
  const handleClick=()=>{
    const direccion2 = direccion.replace(/<[^>]+>/g, "").trim();
    //pasar la fecha a formato chile
    const fechaChile = new Date(fecha.getTime() - 3 * 60 * 60 * 1000).toISOString().slice(0,19) + "-03:00";
    const lecturaObj = {fecha:fechaChile,medidor,direccion:direccion2,valor,tipoMedida};
    let errores = [];
    if (!fecha){
        errores.push("Fecha no válida");
    };
    if (!direccion2){
        errores.push("Direccion no válida");
    };
    if (!valor){
        errores.push("Valor no válido");
    };

    if (errores.length>0){
        console.log(errores)
        const msg = "ERROR:"+errores.join("|")
        toast.current.show({severity: "error", summary: msg});
        return;
    };
    onCreateLectura(lecturaObj);
    console.log(lecturaObj);
  }
  const medidores = ["01","02","03","04","05","06","07","08","09","10"];
    const tipoMedidas = [{ key: 1, label: "KiloWatts"},{ key: 2, label: "Watts"},{ key: 3, label: "Temperatura"}];

  const [fecha,setFecha] = useState("");
  const [medidor,setMedidor] = useState(medidores[0]);
  const [direccion,setDireccion] = useState("");
  const [valor,setValor] = useState("");
  const [tipoMedida, setTipoMedida] = useState(tipoMedidas[0].label);

  return (
    <div className="row">
        <Toast ref={toast} position="top-left" />

            <div className="row">
                <label>Fecha</label>
                <Calendar value={fecha} onChange={(e) => setFecha(e.value)} dateFormat="dd-MM-yy"  showTime/>
            </div>

            <div className="row">
                <label>Medidor</label>
                <Dropdown value={medidor} onChange={(e) => setMedidor(e.value)} options={medidores} className="w-full" />
            </div>

            <div className="row">
                <label>Direccion</label>
                <Editor value={direccion} onTextChange={(e) => setDireccion(e.textValue)} style={{ height: '320px' }} />

            </div>

            <div className="row">
                <label>Valor </label>
                <InputNumber min="0" max="500" value={valor} onValueChange={(e) => setValor(e.value)}/>
            </div>

            <div className="row">
                <label>Tipo de Medida</label>
                <div className="flex gap-4">
                {tipoMedidas.map((item) => (
                    <div key={item.key} className="flex align-items-center">
                        <RadioButton
                            inputId={item.key}
                            name="tipoMedida"
                            value={item.label}
                            onChange={(e) => setTipoMedida(e.value)}
                            checked={tipoMedida === item.label}
                        />
                        <label htmlFor={item.key} className="ml-2">
                            {item.label}
                        </label>
                    </div>
                ))}
                </div>
            </div>

            <div className="row">
                <Button onClick={handleClick} rounded severity='info' label='Registrar Lectura'  ></Button>
            </div>

    </div>
  )
}

export default LecturaForm
