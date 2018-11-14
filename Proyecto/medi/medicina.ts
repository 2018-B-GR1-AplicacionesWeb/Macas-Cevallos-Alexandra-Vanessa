declare var require:any;
var inquirer = require('inquirer');
const rxjs = require('rxjs');
const fs = require('fs');
const map = require('rxjs/operators').map;
const reduce = require('rxjs/operators').reduce;

// Iniciando datos


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

class Cliente{
    Nombre:string;
    email:string;
}


class Med{
    tipo:string;

    constructor(tipo:string){


        this.tipo = tipo;
    }
}

class Orden{
    medi:Med;
    cantidad;
    valor_detalle=0.0;
    constructor(pizza:Med, cantidad:Number) {
        this.medi = pizza;
        this.cantidad=cantidad;
     //   this.valor_detalle=this.cantidad*this.medi.precio;
    }
    public toString = () : string => {
        let espacios:string = "            ";
        return `${this.medi.tipo}${espacios.substring(this.medi.tipo.length)}${this.cantidad}${espacios.substring(String(this.cantidad).length)}`;
    }
}

class Pedido{
    cliente:Cliente;
    ordenes:Orden[]=[];
    mostrar_ordenes(){
        this.ordenes.forEach(

            (orden)=>{

                console.log(orden.toString())


            }
        );
    };













}


//---------------PREGUNTAS

// preguntas del menu principal
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

let preguntas_login_administrador = [
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
            if (answer!=='admin') {
                return 'Password required!';
            }
            return true;
        }
    },
];

let preguntas_crud = [
    {
        type:"list",
        name:"crud_op",
        message:"Que desea hacer",
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

let pregunta_actualizar = [
    {
        type:'input',
        name:"old",
        message:"Ingrese tipo de medi a actualizar?"
    },
    {
        type:'input',
        name:"nuevo",
        message:"Ingrese el nuevo tipo de medi para reemplazar?"
    }
];

let pregunta_eliminar = [
    {
        type:"input",
        name:'borrar',
        message:"Ingrese tipo de medi a eliminar?",

    }
];

let pregunta_insertar = [
    {
        type:"input",
        name:'insert',
        message:"Ingrese tipo de medi a insertar?",

    },
    {
        type:'input',
        name:"saldo",
        message:"Ingrese el precio de medi para reemplazar?",
        validate: function( value ) {
            var valid = !isNaN(parseFloat(value));
            return valid || "Por favor ingrese un numero valido";
        },
        filter: Number
    }
];











let preguntas_menu_secundario = [

    {
        type: "list",
        name: "clase",
        message: "Que clase de medi",
        choices: medicinalis,
        filter:( val )=>{ return val.toLowerCase(); }
    },
    {
        type: "input",
        name: "cantidad",
        message: "Cuantas necesitas",
        validate: function( value ) {
            var valid = !isNaN(parseFloat(value));
            return valid || "Por favor ingrese un numero valido";
        },
        filter: Number
    },
    {
        type:"confirm",
        name:"seguir",
        message:"Desea algo mas?",
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
                        .prompt(preguntas_login_administrador)
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
                                    pedir_pizza(pedido);
                                }
                            }
                        );
                }

            }
        );


}


function menu_crud(){
    inquirer
        .prompt(preguntas_crud)
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
                                .prompt(pregunta_actualizar)
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
                                .prompt(pregunta_eliminar)
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
                                .prompt(pregunta_insertar)
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


function pedir_pizza(pedido:Pedido) {
    inquirer
        .prompt(preguntas_menu_secundario)
        .then(
            (respuestas)=>{


                let pizza = new Med(respuestas.clase);
                let cantidad = respuestas.cantidad
                pedido.ordenes.push(new Orden(pizza,cantidad));

                if (respuestas.seguir){
                    pedir_pizza(pedido)
                }else {
                    console.log('-------------------------------------------' +
                        '\nDetalle de la medicina solicitada\n' +
                        '-----------------------------------------\n'+
                        'Detalle,Precio  Cantidad    \n' +
                        '.............................')
                    pedido.mostrar_ordenes();
                    console.log("........................");

                }
            }
        );
}



iniciar();