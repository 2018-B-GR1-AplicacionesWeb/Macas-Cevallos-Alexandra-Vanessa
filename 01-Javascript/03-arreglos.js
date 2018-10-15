var arreglo = [];
arreglo = [1,2,3,4];
arreglo = [
    1,
    "Adrian",
    false,
    null,
    new Date(),
    {
        nombre: "Vicente"
    },
    [1,2,false,true]
]
console.log(arreglo)
arreglo.push(3);
console.log(arreglo);
arreglo.pop();
console.log(arreglo);
///agregar mediante el indice añadir elementos de arreglo en cualquier posiscion
var arregloDeNumero = [1,2,3,4,5];
arregloDeNumero.splice(1,0,1.1);
console.log(arregloDeNumero);
//eliminar
arregloDeNumero.splice(4,1);
console.log(arregloDeNumero);
/////buscar el indice
var indiceDelNumero2 = arregloDeNumero.indexOf(2);
console.log(indiceDelNumero2);
//1.2,1.4...1.9
arregloDeNumero.splice(indiceDelNumero2,0,1.2,1.3,1.4,1.5,1.6,1.7,1.8,1.9);
console.log(arregloDeNumero);
////////solo retornar el elmento cualquier
var indiceDe7  = arregloDeNumero.indexOf(1.7);
console.log(arregloDeNumero[indiceDe7]);
// 1.1 -1.9
var posicionUnoUno = arregloDeNumero.indexOf(1.1);
var posicionNueve = arregloDeNumero.indexOf(1.9);
var desdeUnoUNoaNueveNueve = (posicionUnoUno - posicionNueve) +1;
var arregloArgumento = [desdeUnoUNoaNueveNueve,desdeUnoUNoaNueveNueve];
//arregloDeNumero.splice(posicionUnoUno,posicionNueve);
arregloDeNumero.splice(...arregloArgumento);
console.log(arregloDeNumero);

//////sumar arreglos con la destructuracion de arreglos
var arregloUno = [1,2,3];
var arregloDos = [4,5,6];
var arregloComleto = [...arregloUno , ...arregloDos];
console.log(...arregloComleto);
////destructuracion de objetos

var adrian = {
    nombre: "Adrian",
    apellido: "Eguez",
    direccion: "Gregorio Bobadilla",
    casado: false,
    edad: 29
};
var vicente = {
    mascota: {
        nombre: "Cachetes"
    },
    fechaNacimiento: new Date('1989-06-10')
};

var datosDelUsuario = {
    ...adrian,
    ...vicente
};

console.log(datosDelUsuario);

// Objetos

var atributosDelObjeto = Object.keys(datosDelUsuario);


console.log(atributosDelObjeto);

console.log(datosDelUsuario[atributosDelObjeto[0]]);


