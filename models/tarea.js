//Importo el uuid que me genera el id unico en el mundo
const { v4: uuidv4 } = require('uuid') 

//creo una clase tarea y defino mis propiedades
class Tarea {
    id = '';
    desc = '';
    completadoEn = null;

    //Este constructor lo llama cada vez que cree una clase, le envio el id que genera uuid
    //la descripción que recibo y por defecto el completadoEn en null porque luego lo cambio
    //de manera manual en la app de consola
    constructor(desc){
        this.id = uuidv4();
        this.desc = desc;
        this.completadoEn = null;
    }
}

//Esta clase funciona para una unica tarea, por eso se crea la clase tareas.js
module.exports = Tarea;