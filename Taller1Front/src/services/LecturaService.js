const localKey = "lectura_list_data";
let contador_id = 1;

const createLectura = (lectura) => {
    let lista = [];
    const data = localStorage.getItem(localKey);
    if(data != null){
        lista = JSON.parse(data);
    }
    lectura.id = contador_id;
    contador_id +=1;
    lista = [...lista, lectura];
    console.log(lectura)
    localStorage.setItem(localKey, JSON.stringify(lista));
};

const getLecturas = () => {
    const data = localStorage.getItem(localKey);
    if (!data) {
        return [];
    }
    const lista = JSON.parse(data);
    const tipos = {"KiloWatts":"kW","Watts":"W","Temperatura":"C"};
    const listaFormateada = lista.map((dato) => {
        if (!dato.fecha) return dato;
        //"2025-11-03T23:27:00-03:00"
        //"012345678901234567890123"
        const fecha = dato.fecha.slice(0,10); // ["2025-11-08"]
        const hora = dato.fecha.slice(11,16); //["01:53"]
        const tipo2 = tipos[dato.tipoMedida]
        return {
            ...dato,
            fecha: fecha, // "2025-11-08"
            hora: hora,       // "01:53"
            tipo: tipo2
        };
    });

    return listaFormateada;
};

const deleteLectura = (id) => {
    const data = localStorage.getItem(localKey);
    if (!data) return;
    let lista = JSON.parse(data);

    //borra seleccionando todas menos la del id
    lista = lista.filter((item) => item.id !== id);
    localStorage.setItem(localKey, JSON.stringify(lista));
};

export { createLectura, getLecturas, deleteLectura };
