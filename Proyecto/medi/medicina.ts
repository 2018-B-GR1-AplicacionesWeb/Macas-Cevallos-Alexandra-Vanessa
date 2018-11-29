/*declare var require:any;
var inquirer = require('inquirer');
const rxjs = require('rxjs');
const fs = require('fs');
const map = require('rxjs/operators').map;
const reduce = require('rxjs/operators').reduce;
constmergeMap =require('rxjs/operators').mergeMap;

const AppendFile = (nombreArchivo, contenido,replace?:boolean)=>{
    // @ts-ignore
    return  new Promise(
        (resolve,reject) => {

            fs.readFile(
                nombreArchivo,
                'utf-8',
                (error,contenidoArchivo) => {
                    if (error) {
                        fs.writeFile(
                            nombreArchivo,
                            contenido,
                            (error)=>{
                                if (error){
                                    reject(error);
                                }else {
                                    resolve(contenido)
                                }
                            }
                        );

                    } else {
                        fs.writeFile(
                            nombreArchivo,
                            //contenidoArchivo+contenido,
                            replace == true? contenido:contenidoArchivo+contenido,
                            (error)=>{
                                if (error){
                                    reject(error);
                                }else {
                                    resolve(contenido)
                                }
                            }
                        );
                    }
                }
            );

        }
    );
}
// Cargar datos
const GetData  = (nombreArchivo)=>{
    // @ts-ignore
    return new Promise(
        (resolve,reject)=>{
            fs.readFile(
                nombreArchivo,
                'utf-8',
                (error,contenidoArchivo) => {
                       if (error){
                           reject(error);
                       }else {
                           resolve(contenidoArchivo)
                       }
                }
            );
        }
    )
};
let medicinalis=[];
GetData('DataBase/medicinas')
    .then(
        (contenido)=>{

            String(contenido).split("||").forEach(
                (value)=>{

                    medicinalis.push(value);
                }
            )

        }
    );


// Entidades
class Med{
    tipo:string;

    constructor(tipo:string){


        this.tipo = tipo;
    }
}

class Orden{
    medi:Med;
    cantidad;


    constructor(Medicina:Med, cantidad:Number) {
        this.medi = Medicina;
        this.cantidad=cantidad;
     //   this.valor_detalle=this.cantidad*this.medi.precio;
    }
    public toString = () : string => {
        let espacios:string = "         ";
        return `${this.medi.tipo}${espacios.substring(this.medi.tipo.length)}${this.cantidad}${espacios.substring(String(this.cantidad).length)}`;
    }
}

class Pedido{

    ordenes:Orden[]=[];
    mostrar_ordenes(){
        this.ordenes.forEach(

            (orden)=>{

                console.log(orden.toString())


            }
        );
    };

}

let preguntasMenu = [

    {
        type: "list",
        name: "Opciones",
        message: "Que desea hacer?",
        choices: [
            "Ordenar medicina",
            "Salir",

        ],
    },

];

// Preguntas del menu secundario
let login = [
    {
        type: "list",
        name: "sesion",
        message: "Ingreso:",
        choices: ['Admin','Cliente'],
        filter:( val )=>{ return val.toLowerCase(); }
    },

];

let preguntas_login = [
    {
        type: 'input',
        name: 'nickname',
        message: "User",
    },
    {
        type: 'password',
        message: 'Password:',
        name: 'clave',
        validate: function (answer) {
            if (answer!=='1234') {
                return 'Password required!';
            }
            return true;
        }
    },
];

let CRUD = [
    {
        type:"list",
        name:"crud_op",
        message:"Escoja una opcion",
        choices: ['Consultar','Modificar','Eliminar','Nueva','salir'],
        validate:(respuesta)=>{
            if(respuesta.crud_op=='salir'){
                return false;
            }else{
                return respuesta
            }
        }
    }
];

let actualizar = [
    {
        type:'input',
        name:"old",
        message:"Ingrese nombre del medicamento?"
    },
    {
        type:'input',
        name:"nuevo",
        message:"Ingrese el nuevo nombre de medicamento?"
    }
];

let eliminar = [
    {
        type:"input",
        name:'borrar',
        message:"Ingrese nombre de medicamento?",

    }
];

let insertar = [
    {
        type:"input",
        name:'insert',
        message:"Ingrese nombre de medicamento:",

    },
    {
        type:'input',
        name:"saldo",
        message:"Ingrese el precio:",
        validate: function( value ) {
            var valid = !isNaN(parseFloat(value));
            return valid || "Por favor ingrese un numero valido";
        },
        filter: Number
    }
];

let menu_secundario = [

    {
        type: "list",
        name: "clase",
        message: "medicamento",
        choices: medicinalis,
        filter:( val )=>{ return val.toLowerCase(); }
    },
    {
        type: "input",
        name: "cantidad",
        message: "Cantidad",
        validate: function( value ) {
            var valid = !isNaN(parseFloat(value));
            return valid || "Por favor ingrese un numero valido";
        },
        filter: Number
    },
    {
        type:"confirm",
        name:"seguir",
        message:"Nueva compra?",
    },

];




// Ejecutar menu_principal
function iniciar() {
    inquirer
        .prompt(login)
        .then(
            (respuestas) => {
                if (respuestas.sesion == 'admin') {
                    // Menu administrador
                    inquirer
                        .prompt(preguntas_login)
                        .then((respuestas) => {
                                if (respuestas.clave) {
                                    menu_crud();
                                }else {
                                    console.log(respuestas.clave);
                                    iniciar();
                                }
                            }
                        );
                } else {
                    inquirer
                        .prompt(preguntasMenu)
                        .then((respuestas) => {
                                if (respuestas.opciones != 'Salir') {
                                    console.log('Eliga una medi del menu:')
                                    let pedido = new Pedido();
                                    pedidos(pedido);
                                }
                            }
                        );
                }

            }
        );


}


function menu_crud(){
    inquirer
        .prompt(CRUD)
        .then((respuestas) => {
                if (respuestas.crud_op === 'salir') {
                    console.log(respuestas.clave);
                    iniciar();
                } else {
                    switch (respuestas.crud_op) {
                        case 'Consultar':
                            medicinalis.forEach(
                                (valor)=>{
                                        console.log(valor)
                                }
                            );
                            break;
                        case 'Modificar':
                            inquirer
                                .prompt(actualizar)
                                .then(
                                    (respuestas) => {
                                        //buscar y reemplazar

                                        medicinalis.forEach((element, index, array) => {

                                            if (element == String(respuestas.old)) {
                                                console.log('econtrado');
                                                array[index]= respuestas.nuevo
                                            }
                                            console.log(`${element},${respuestas.old}`);
                                        });
                                        let contenido:string='';
                                        const pizza$ = rxjs.from(medicinalis);
                                        pizza$
                                            .subscribe(
                                                (ok)=>{
                                                    contenido=contenido+ok+"||";
                                                },
                                                (error)=>{
                                                    console.log("error:",error)
                                                },
                                                ()=>{
                                                    // volver a actualizar la base
                                                    AppendFile('DataBase/medicinas',contenido,true)
                                                        .then(
                                                            ()=>{
                                                                console.log('contenido actualizado')
                                                                menu_crud();
                                                            }
                                                        );

                                                }
                                            )
                                    }
                                );
                            break;
                        case 'Eliminar':
                            inquirer
                                .prompt(eliminar)
                                .then(
                                    (respuestas) => {
                                        //buscar y reemplazar

                                        medicinalis.forEach((element, index, array) => {

                                            if (element == String(respuestas.borrar)) {
                                                console.log('econtrado');
                                                array[index]='';
                                            }
                                            console.log(`${element},${respuestas.borrar}`);
                                        });
                                        let contenido:string='';
                                        const pizza$ = rxjs.from(medicinalis);
                                        pizza$
                                            .subscribe(
                                                (ok)=>{
                                                    if (ok) {
                                                        contenido = contenido + ok + ",";
                                                    }
                                                },
                                                (error)=>{
                                                    console.log("error:",error)
                                                },
                                                ()=>{
                                                    // volver a actualizar la base
                                                    AppendFile('DataBase/medicinas',contenido,true)
                                                        .then(
                                                            ()=>{
                                                                console.log('contenido actualizado')
                                                                menu_crud();
                                                            }
                                                        );

                                                }
                                            )
                                    }
                                );
                            break;
                        case 'Nueva':


                            inquirer
                                .prompt(insertar)
                                .then((respuestas) => {
                                    console.log(respuestas);
                                  let  res1 = respuestas.insert;
                                  let res2 = respuestas.saldo;
                                  medicinalis.push(res1 + ',' + res2);
                                //  medicinas.push(res2 + ';');

                                   // medicinas.push(respuestas.insert);
                                   // medicinas.push(respuestas.saldo);
                                    let contenido = '';
                                    const pizza$ = rxjs.from(medicinalis);
                                    pizza$
                                        .subscribe((ok) => {
                                                if (ok) {

                                                    contenido = contenido + ok + "||";
                                                }
                                            },

                                            (error) => {
                                                console.log("error:", error);
                                            }, () => {
                                                // volver a actualizar la base
                                                AppendFile('DataBase/medicinas', contenido, true)
                                                    .then(() => {
                                                        console.log('contenido actualizado');
                                                        menu_crud();
                                                    });
                                            });
                                });

                            break;
                    }

                    //menu_crud();
                }

            }
        );
}
////////////////////////////////

function pedidos(pedido:Pedido) {
    inquirer
        .prompt(menu_secundario)
        .then(
            (respuestas)=>{


                let medicamento = new Med(respuestas.clase);
                let cantidad = respuestas.cantidad
                pedido.ordenes.push(new Orden(medicamento,cantidad));

                if (respuestas.seguir){
                    pedidos(pedido)
                }else {
                    console.log('-------------------------------------------' +
                        '\nDetalle de la medicina solicitada\n' +
                        '-----------------------------------------\n'+
                        'Detalle,$0.0 Cantidad    \n' +
                        '.............................')
                    pedido.mostrar_ordenes();
                    console.log("........................");

                }
            }
        );
}
iniciar();


///////////////***********************//////////////
declare var require: any;
const inquirer = require('inquirer');
const fs = require('fs');
const rxjs = require('rxjs');
const timer = require('rxjs').timer;
const mergeMap = require('rxjs/operators').mergeMap;
const map = require('rxjs/operators').map;
const retryWhen = require('rxjs/operators').retryWhen;
const delayWhen = require('rxjs/operators').delayWhen;

const preguntaMenu = {
    type: 'list',
    name: 'opcionMenu',
    message: 'Que quieres hacer',
    choices: [
        'Crear',
        'Borrar',
        'Buscar',
        'Actualizar',
        'Salir'
    ]
};

const preguntaBuscarUsuario = [
    {
        type: 'input',
        name: 'idUsuario',
        message: 'Ingrese Codigo de la  Medicina',
    }
];

const preguntaUsuario = [
    {
        type: 'input',
        name: 'id',
        message: 'Cual es el codigo de la medicina'
    },
    {
        type: 'input',
        name: 'nombre',
        message: 'Cual es el nombre de la medicina'
    },
    {
        type: 'input',
        name: 'precio',
        message: 'Cual es el precio'
    },



];

const preguntaEdicionUsuario = [
    {
        type: 'input',
        name: 'nombre',
        message: 'Cual es el nuevo nombre de la medicina'
    },
];


function inicialiarBDD() {

    return new Promise(
        (resolve, reject) => {
            fs.readFile(
                'bdd.json',
                'utf-8',
                (error, contenidoArchivo) => { // CALLBACK
                    if (error) {

                        fs.writeFile(
                            'bdd.json',
                            '{"usuarios":[]}',
                            (error) => {
                                if (error) {
                                    reject({
                                        mensaje: 'Error creando',
                                        error: 500
                                    })
                                } else {
                                    resolve({
                                        mensaje: 'BDD leida',
                                        bdd: JSON.parse('{"usuarios":[]}')
                                    })
                                }

                            }
                        )

                    } else {
                        resolve({
                            mensaje: 'BDD leida',
                            bdd: JSON.parse(contenidoArchivo)
                        })
                    }
                }
            )
        }
    );

}

async function main() {

    // of(Cualquier cosa JS)
    // from(Promesas)
    const respuestaBDD$ = rxjs.from(inicialiarBDD());

    respuestaBDD$
        .pipe(
            preguntarOpcionesMenu(),
            opcionesRespuesta(),
            ejecutarAcccion(),
            guardarBaseDeDatos()
        )
        .subscribe(
            (data) => {
                //
                console.log(data);
            },
            (error) => {
                //
                console.log(error);
            },
            () => {
                main();
                console.log('Complete');
            }
        )

}

function guardarBDD(bdd: BDD) {
    return new Promise(
        (resolve, reject) => {
            fs.writeFile(
                'bdd.json',
                JSON.stringify(bdd),
                (error) => {
                    if (error) {
                        reject({
                            mensaje: 'Error creando',
                            error: 500
                        })
                    } else {
                        resolve({
                            mensaje: 'BDD guardada',
                            bdd: bdd
                        })
                    }

                }
            )
        }
    )
}


main();


function preguntarOpcionesMenu() {
    return mergeMap( // Respuesta Anterior Observable
        (respuestaBDD: RespuestaBDD) => {

            return rxjs
                .from(inquirer.prompt(preguntaMenu))
                .pipe(
                    map( // respuesta ant obs
                        (respuesta: OpcionMenu) => {
                            respuestaBDD.opcionMenu = respuesta;
                            return respuestaBDD
                            // Cualquier cosa JS
                        }
                    )
                );

            // OBSERVABLE!!!!!!!!!!
        }
    )
}

function opcionesRespuesta() {
    return mergeMap(
        (respuestaBDD: RespuestaBDD) => {
            const opcion = respuestaBDD.opcionMenu.opcionMenu;
            switch (opcion) {
                case 'Crear':
                    return rxjs
                        .from(inquirer.prompt(preguntaUsuario))
                        .pipe(
                            map(
                                (medicina: Medicina) => { // resp ant OBS
                                    respuestaBDD.medicina = medicina;
                                    return respuestaBDD;
                                }
                            )
                        );
                case 'Buscar':

                    return consultarid(respuestaBDD);
                case 'Actualizar':
                    return preguntarIdUsuario(respuestaBDD);
                case 'Borrar':
                    return consultarid(respuestaBDD);
            }
        }
    )
}

function guardarBaseDeDatos() {
    return mergeMap(// Respuesta del anterior OBS
        (respuestaBDD: RespuestaBDD) => {
            // OBS
            return rxjs.from(guardarBDD(respuestaBDD.bdd))
        }
    )
}

function ejecutarAcccion() {
    return map( // Respuesta del anterior OBS
        (respuestaBDD: RespuestaBDD) => {
            const opcion = respuestaBDD.opcionMenu.opcionMenu;
            switch (opcion) {
                case 'Crear':
                    const medicina = respuestaBDD.medicina;
                    respuestaBDD.bdd.usuarios.push(medicina);
                    return respuestaBDD;
                case 'Actualizar':
                    const indice1 = respuestaBDD.indiceUsuario;
                    respuestaBDD.bdd.usuarios[indice1].nombre = respuestaBDD.medicina.nombre;
                    return respuestaBDD;
                case 'Buscar':

                    const indice = respuestaBDD.indiceUsuario;
                    if(indice===-1){
                        console.error('error')
                    }else{
                        console.log('Medicina Buscado',respuestaBDD.bdd.usuarios[indice])
                    }
                    return respuestaBDD;
                case 'Borrar':
                    const indice3 = respuestaBDD.indiceUsuario;
                    if(indice3===-1){
                        console.error('error')
                    }else{

                        console.log('Medicina Buscado',respuestaBDD.bdd.usuarios[indice3]);
                        const a = respuestaBDD.bdd.usuarios
                        a.splice(respuestaBDD.bdd.usuarios[indice3],1)

                //    medicina.splice(respuestaBDD.bdd.usuarios[indice3],1);


                     // indice3.splice(respuestaBDD.bdd.usuarios[indice],1)
                    }
                    return respuestaBDD;
            }
        }
    )
}

interface RespuestaBDD {
    mensaje: string;
    bdd: BDD;
    opcionMenu?: OpcionMenu;
    medicina?: Medicina;
    indiceUsuario?: number;
}

interface BDD {
    usuarios: Medicina[] | any;

}


interface Medicina {
    id: number;
    nombre: string;
    precio:number;
}


interface OpcionMenu {
    opcionMenu: 'Crear' | 'Borrar' | 'Buscar' | 'Actualizar';
}

interface BuscarUsuarioPorId {
    idUsuario: string;
}

function preguntarIdUsuario(respuestaBDD: RespuestaBDD) {
    return rxjs
        .from(inquirer.prompt(preguntaBuscarUsuario))
        .pipe(
            mergeMap( // RESP ANT OBS
                (respuesta: BuscarUsuarioPorId) => {
                    const indiceUsuario = respuestaBDD.bdd
                        .usuarios
                        .findIndex( // -1
                            (medicina: any) => {
                                return medicina.id === respuesta.idUsuario
                            }
                        );
                    if (indiceUsuario === -1) {
                        console.log('preguntando de nuevo');
                        return preguntarIdUsuario(respuestaBDD);
                    } else {
                        respuestaBDD.indiceUsuario = indiceUsuario;
                        return rxjs
                            .from(inquirer.prompt(preguntaEdicionUsuario))
                            .pipe(
                                map(
                                    (nombre: { nombre: string }) => {
                                        respuestaBDD.medicina= {
                                            id: null,
                                            nombre: nombre.nombre,
                                            precio: null
                                        };
                                        return respuestaBDD;
                                    }
                                )
                            );

                    }

                }
            )
        );
}

function consultarid(respuestaBDD: RespuestaBDD) {
    return rxjs
        .from(inquirer.prompt(preguntaBuscarUsuario))
        .pipe(
            map( // RESP ANT OBS
                (respuesta: BuscarUsuarioPorId) => {
                    const indiceUsuario = respuestaBDD.bdd
                        .usuarios
                        .findIndex( // -1
                            (medicina: any) => {

                                return medicina.id === respuesta.idUsuario

                            }
                        );

                    respuestaBDD.indiceUsuario = indiceUsuario;

                    return respuestaBDD;


                }
            )
        );
}