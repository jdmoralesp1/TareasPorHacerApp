const fs = require('fs');

//Ruta de nuestro archivo de "BD"
const archivo = './db/data.json';

//Recibo los datos con Data
const guardarDB = (data) =>{
    //usamos el fyle system para escribir sobre el archivo
    //toca convertir el objeto recibido en un tipo Json valido, lo hacemos con JSON.stringify
    fs.writeFileSync(archivo, JSON.stringify(data));
    //fs.writeFileSync(ruta, data a guardar);
}

//Funcion para leer la BD
const leerDB = () =>{
    //Verifico si el archivo no existe, si asi es entonces retorno null
    if(!fs.existsSync(archivo)){
        return null;
    }

    //si existe el archivo creo una variable llamada info donde guardare el contenido de archivo
    //pero me la trae como un string
    const info = fs.readFileSync(archivo, {encoding: 'utf8'});
    //por eso aca me devuelvo y hago el contrario de JSON.stringify para retornar el arreglo
    const data = JSON.parse(info);
    //console.log(data);
    return data;
}


//Siempre rexordar de importar las fucniones y lo que necesite
module.exports = {
    guardarDB,
    leerDB
}