const inquirer = require('inquirer');
require('colors');

const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Qué desea hacer?',
        choices: [ 
        //Esta es la mejor forma de manejar mis opciones y puedo ver el value y name como el option de html
            {
                value: '1',
                name: `${'1.'.green} Crear tarea`
            },
            {
                value: '2',
                name: `${'2.'.green} Listar tareas`
            },
            {
                value: '3',
                name: `${'3.'.green} Listar tareas completadas`
            },
            {
                value: '4',
                name: `${'4.'.green} Listar tareas pendientes`
            },
            {
                value: '5',
                name: `${'5.'.green} Completar tarea(s)`
            },
            {
                value: '6',
                name: `${'6.'.green} Borrar tarea`
            },
            {
                value: '0',
                name: `${'0.'.green} Salir`
            },
        ]
    }
];

const inquirerMenu= async() =>{
    console.clear();
    console.log('======================='.green);
    console.log(' Seleccione una opción '.white);
    console.log('=======================\n'.green);
    //Aca desestructuro lo que recibo del inquirer pregunta y retorno solamente el valor 
    //que me interesa que es el numero de la opción que es el nombre en la linea 7
    const { opcion } = await inquirer.prompt(preguntas); 

    return opcion;
};

const pausa = async() => {

    const question = [
        {
            type: 'input',
            name: 'enter',
            message: `\nPresione ${'ENTER'.green} para continuar`
        }
    ]

    console.log("\n");
    await inquirer.prompt(question);

}


const leerInput = async(message) => {
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            //asi se define una funcion dentro de un objeto para que haga una validación
            validate(value){
                if(value.length === 0) {
                    return 'Por favor ingrese un valor';
                }
                return true;
            }
        }
    ];

    //Esto me devuelve el objeto completo del question, por eso desestructuro y tomo solo la desc
    //que es la que me interesa
    const { desc } = await inquirer.prompt(question);
    return desc;
}

//Recibe el array de las tareas que existen
const litadoTareasBorrar = async(tareas =[]) => {
    //usamos el .map para tomar un array, transformar algunos datos y crear uno nuevo
    //entonces en la variable choices guardaremos el id de la tarea en el value y el name será lo
    //que se va a mostrar en pantalla para que el usuario escoja
    const choices = tareas.map((tarea, i) =>{

        const idx = `${i+1}.`.green;
        return {
            value: tarea.id,
            name: `${idx} ${tarea.desc}`
        }
    });

    //Para agregar una opción al inicio del arreglo uso .unshift, el cual tendra como valor 0
    //Se evalua en el app.js si es !=0 entonces si hacer algo, si no, entonces no hacer nada e
    //iterar de nuevo 
    choices.unshift({
        value: '0',
        name: '0.'.green + ' Cancelar'
    });

    //Aca transformamos el array que se modifico con .map y lo mostraremos en pantalla para que 
    //escoja una opción, recibe el choices que es el nuevo arreglo
    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Borrar',
            choices: choices
        }
    ]

    //desestructuramos la opción escogida por el user y enviamos el id (largo) que luego se usa en 
    //app.js para luego llamar la función de eliminar tarea que trabaja en base al id
    const { id } = await inquirer.prompt(preguntas);

    return id;
}

//Esta función la uso para confirmar algo, se puede reutilizar
//El mesagge puede ser algo como "esta seguro?" o cualquier cosa por el estilo
const confirmar = async(message) => {
    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message: message
        }
    ];

    const { ok } = await inquirer.prompt(question);
    return ok;
}

//mostrar las tareas que ya estan hechas y asi mismo enviar las que quiere completar o descompletar
const mostrarListadoChecklist = async(tareas =[]) => {
    const choices = tareas.map((tarea, i) =>{

        const idx = `${i+1}.`.green;
        return {
            value: tarea.id,
            name: `${idx} ${tarea.desc}`,
            checked: (tarea.completadoEn) ? true : false
        }
    });


    //Por medio de choices envia el value, name y el cheked de la tarea porque usamos un checkbox
    const pregunta = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Seleccione',
            choices: choices
        }
    ]

    const { ids } = await inquirer.prompt(pregunta);

    return ids;
}

module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    litadoTareasBorrar,
    confirmar,
    mostrarListadoChecklist
}