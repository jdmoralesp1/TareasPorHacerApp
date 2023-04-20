require('colors');

const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const { 
    inquirerMenu, 
    pausa,
    leerInput,
    litadoTareasBorrar,
    confirmar,
    mostrarListadoChecklist
} = require('./helpers/inquirer');
const Tareas = require('./models/tareas');

//esta va a ser mi función o main principal de la app
const main = async()=>{

    let opt = '';
    //Aca no es que cree una nueva tarea, solo la llamo para no insertarla en el do while y que se 
    //vuelva a llamar en cada iteración
    const tareas = new Tareas();

    const tareasDB = leerDB();

    //Si existe un archivo con tareas cargue el mismo a _listado para el posterior CRUD de las tareas
    if(tareasDB){
        //Establecer tareas
        tareas.cargarTareasFromArray(tareasDB);
    }

    do{
        //imprimir el menu y extraer la opción
        opt = await inquirerMenu();
        switch (opt) {
            case '1':
                //Crear opcion
                const desc = await leerInput('Descripción:');
                tareas.crearTarea(desc);
            break;

            case '2':
                tareas.listadoCompleto();
                //console.log(tareas.listadoArr);
            break;

            case '3': // listar completadas
                tareas.listarPendientesCompletadas();
            break;

            case '4': //listar pendientes
                tareas.listarPendientesCompletadas(false);
                //console.log(tareas.listadoArr);
            break;

            case '5': //completado | pendiente
                const ids = await mostrarListadoChecklist(tareas.listadoArr);
                tareas.toggleCompletadas(ids);

            break;

            case '6':
                const id = await litadoTareasBorrar(tareas.listadoArr);
                if(id!=='0'){
                    const ok = await confirmar('¿Esta seguro?');
                    if(ok){
                        tareas.borrarTarea(id);
                        console.log('Tarea borrada')
                    }   
                }
                
            break;
        }

        //Guardo despues de que haga cada do-while para ir almacenando la info conforma la voy tratando
        guardarDB(tareas.listadoArr)

        await pausa();
        
    }while(opt != '0')

}

main();