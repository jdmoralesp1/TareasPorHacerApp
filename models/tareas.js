//Importo la clase tarea para apartir de ella realizar todas las acciones sobre las tareas en general
const Tarea = require("./tarea");
require('colors');


class Tareas {
    //es mejor trabar el listado como un objeto y no como un array para acceder de mejor manera 
    //a la información, asi mismo ese listado apuntara al id de la tarea que yo quiera manejar
    _listado = {};

    constructor() {
        this._listado = {};
    }

    //Para crear la tarea unicamente recibire la descripción
    crearTarea(desc='') {
        //Creo la instancia de la tarea enviandole la desc
        const tarea = new Tarea(desc);
        //Esta tarea que cree necesito insertarla en el _listado, lo hago mediante el this._listado
        //y a ese this._listado en los [] le agrego el id de mi tarea ya que el objeto busca en base al id
        this._listado[tarea.id] = tarea;
    }

    //el _listado es un objeto pero para trabajarlo mejor lo pasare a un array
    get listadoArr(){
        //creo un array llamado listado
        const listado = [];
        //object es propio de javascript. usando el Object.keys extraere las llaves (en un arreglo) de 
        //_listado (que son los ids generados por uuid) con los que referencio cada tarea creada, y luego
        //los recorro uno a uno con el .forEach
        Object.keys(this._listado).forEach( key =>{
            //creo una variable donde almacenare todo el contenido de la tarea que pertenece al key (id) 
            const tarea = this._listado[key];
            //luego las tareas las guardo en el nuevo arreglo con el .push
            listado.push(tarea);
        });
        //finalmente retorno el array de listado donde mis tareas ya no son un objeto
        return listado;
    }    

    //Esta funcion se llama solo cuando existen datos en la BD, se le envia el arreglo que se extrae
    cargarTareasFromArray( tareas = [] ){
        //Se recorre ese array con el foreach y de cada dato se le envia referenciado por el id
        //con el this._listado[tarea.id] ya que _listado es u objeto y ya habiendo referenciado su key
        //se le envian los datos propiamente de la tarea uno por uno segun como lleguen del array de la BD
        tareas.forEach( tarea => {
            this._listado[tarea.id] = tarea;
        });
    }

    //Recibo el id de la tarea a borrar
    borrarTarea(id=''){
        //si existe la tarea entonces
        if(this._listado[id]){
            delete this._listado[id];
        }
    }

    listadoCompleto(){
        let resul;
        //mi forma
        /*
        for(let i=0;i<this.listadoArr.length;i++){
            let j = i+1;
            if(this.listadoArr[i].completadoEn == null){
                resul = 'Pendiente'.red
            }else{
                
                resul = 'Completada'.green
            }

            console.log(`${j}.`.green,` ${this.listadoArr[i].desc} :: ${resul}`)
        }*/
        console.log('');
        //hacemos un foreach del arreglo y extraemos las tareas y el length del mismo que es la "i"
        this.listadoArr.forEach((tarea, i)=>{
            //como inicia en 0 le sumamos 1
            const idx = `${i+1}`.green;
            //extraemos la desc y el completadoEn desestructurando la tarea, que es como decir tarea.desc
            const {desc, completadoEn} = tarea;
            //valida si completadoEn != null
            const estado = (completadoEn)
                            ? 'Completada'.green
                            : 'Pendiente'.red;

            console.log(`${idx} ${desc} :: ${estado}`);
        })

    }

    listarPendientesCompletadas(completadas = true){
        console.log('');
        let contador=0;
        this.listadoArr.forEach(tarea => {
            
            const {desc, completadoEn} = tarea;
            const estado = (completadoEn)
                            ? 'Completada'.green
                            : 'Pendiente'.red;

            if(completadas){
                if(completadoEn){
                    contador += 1;
                    console.log(`${(contador+'.').green} ${desc} :: ${completadoEn.green}`);
                }
            }else{
                //si completadoEn esta en null
                if(!completadoEn){
                    contador += 1;
                    console.log(`${(contador+'.').green} ${desc} :: ${estado}`);
                }
            }
        })
    }

    //con esta funcion cambio mi BD con fecha en las que selecciono como completadas y null para
    //las que no selecciono
    toggleCompletadas(ids=[]){
        ids.forEach(id =>{
            const tarea = this._listado[id];
            if(!tarea.completadoEn){
                tarea.completadoEn = new Date().toISOString();
            }
        });

        this.listadoArr.forEach(tarea => {
            //Si no existe en el arreglo de ids que envia el usuario en el array general de todas 
            //las tareas entonces
            if(!ids.includes(tarea.id)){
                this._listado[tarea.id].completadoEn = null;
            } 
        })
    }
}

module.exports = Tareas;