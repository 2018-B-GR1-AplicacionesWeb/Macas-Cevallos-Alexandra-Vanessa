// definir las variables
// int edad = 1; lenguajes tipados poner el tipo de datos
//node 01-variables.js
// ctrl+c 2 veces
var edad = 1; // number
var sueldo = 1.01; // number
var nombre= "Adrian"; //
var apellido = 'Eguez'; //
var nombre= `Adrian`; // string
var casado = false; // booleano
var hijos = null; // objeto
var cautrobrazos;
console.log(typeof edad);
//console.log ("hola");
//console.log ('cuatrobrazos', cuatrobrazos); //undefine
//console.log(typeof cuatrobrazos); //undefine
//
//var fecha =new Date ();
//console.log('fecha',fecha); //instacia de clase es object
//console.log (typeof fecha); // object
// en js hay clases pero no es orientado a objetos

var adrianJSON ={
    "nombre":"Adrian",
    "edad": 12,
    "sueldo": 12.2,
    "casado": false,
    "hijos": null,
    "mascota": {
        "nombre":"Cachetes"
    }
}; //object

var adrian = {
    nombre: 'Adrian',
    edad: 29,
    sueldo;12.2,
    casado: false,
    hijos: null,
    deberes: undefined,
    mascota: {
        nombre:'cachetes'
 },
};// object
console.log(adrian.nombre);
//truthy
//falsy
//un string es truthy
//un numero es truthy
//un -1 es truthy
//0 es falsy
//null falsy
//{} o new Date() es truthy
//undefined falsy
//undefined ll true
//no ver for, while, switch
if(""){
    console.log("Si");
}else {
    console.log("no")
}
