declare var require:any;
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

function leerbd(){
	return new promise (resolve, reject) => 
	{
		fs.readFile('medicina.json', 'utf-8',
		(error, contenidoleido) => {
			if (error){
				resolve ({
					mensaje: 'bd vacia',
					bdd: null
				});
			}else
				resolve({
					mensaje: 'bd existente',
					bdd: json.parse(contenidoleido)
				});
		}
	}
}

function crearbd (){
	const contenidoIniciaBDD = '{"paciente": [], "mascota":[]'}'

return new promise (resolve) =>{
	fs.writeFile('medicina.json', contenidoIniciaBDD,
	(error)=>{
		if(error){
			reject({
				mensaje: 'error de creacion'
				error: 500
			});
		}else{
			resolve({
				mensaje:'creado'
				
			});
		}
	})
}
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




async function menu_crud(){
   
   const respuestas = await 
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
						const respuestas = await
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
						const respuestas = await
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

						const respuestas = await
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

function inicializarBase() {
const leerbd$ =rxjs.from(leerbd());
return leerbd$
.pipe(
mergeMap(
(respuestaLeerBDD:RespuestaBDD) =>{
if(respuestaLeerBDD.bdd) {
// truty / {}
return rxjs.of(respuestaLeerBDD)
} else{

// falsy / null
return rxjs.from( crearbd())
}
}
)
);
}

interface RespuestaBDD{
mensaje:string,
bdd:BaseDeDatos
}
interface BaseDeDatos{
medicina: Med[];
Orden:Orden[];
}
interface Med{
    tipo: Tipo [];
	precio: Precio[];

    constructor(tipo:string){


        this.tipo = tipo;
    }
}

interface Orden{
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

interface Pedido{

    ordenes:Orden[]=[];
    mostrar_ordenes(){
        this.ordenes.forEach(

            (orden)=>{

                console.log(orden.toString())


            }
        );
    };

}

