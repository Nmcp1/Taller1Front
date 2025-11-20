const localKey = "lectura_list_data";

const createLectura = (lectura) => {
    let lista = [];
    const data = localStorage.getItem(localKey);
    if(data != null){
        lista = JSON.parse(data);
    }
    lista = [...lista, lectura];
    localStorage.setItem(localKey, JSON.stringify(lista));
};

const getLecturas = ()=> {
    const data = localStorage.getItem(localKey);
    if (data != null) {
        return JSON.parse(data);
    }
    return [];
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
