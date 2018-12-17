function ejemplo() {
}

var ejemploDos = function () {
}; // Anonymous function

var adrian = {
    trabajar: function () {// Anonymous function
        return 'Trabajando';
    }
};

var arregloFunciones = [function () {// Anonymous function

}];
console.log(typeof ejemplo);
console.log(ejemplo);
console.log(ejemplo());







var variableUno; // NUNCA USAR
let variableDos = 2; // USAR MUTABLE (este se asigna a otro valor)
variableDos = variableDos + 1;
const pi = 3.1416;  // INTENTEN USAR CONST SIEMPRE

// operadores

const arregloDeNombres = ['A', 'b', 'C'];

arregloDeNombres[1] = 'B';

arregloDeNombres.push('D');

// arregloDeNombres = {};

// arregloDeNombres = [];


const vicente = {
    nombre: 'Vicente'
};

delete vicente.nombre;

const casado = true;

// casado = false; Cambiar booleanos

const apellido = '';

// nombremed = '123'; Cambiar Strings

const edad = 29;
// edad = 30; Cambiar Number

const variableNull = null;

// variableNull = 1; Cambiar Null

vicente.nombre = 'Adrian';
vicente.edad = 24;

console.log(arregloDeNombres);
console.log(vicente);

arregloDeNombres.forEach(  // Escribir codigo que se entienda
    function (valorActual, indiceActual, arreglo) {
        console.log('Valor Actual', valorActual);
        console.log('Indice Actual', indiceActual);
        console.log('Arreglo', arreglo);
    }
);

// function con nombre
// function anonimas
// fat arrow functions  ->   =>

arregloDeNombres.forEach(  // Escribir codigo que se entienda
    (valorActual, indiceActual, arreglo) => {
        console.log('Valor Actual', valorActual);
        console.log('Indice Actual', indiceActual);
        console.log('Arreglo', arreglo);
    }
);

const sumarDosNumeros = (numUno, numDos) => {
    return numUno + numDos
};

const sumarDosNumerosV2 = (numUno, numDos) => numUno + numDos;

const elevarAlCuadrado = (numero) => numero * numero;

const elevarAlCuadradoV2 = numero => numero * numero;

const arregloNombresDos = ['E', 'F', 'G', 'H'];

////
const resultado = arregloDeNombres
    .map( // mutar cada elemento del arreglo
        valorActual => {
            return valorActual + '.';
        }
    )  // Devolver un ARREGLO
    .forEach(
        (valorNuevo) => console.log(valorNuevo)
    ); // undefined

console.log(resultado);

const arregloNumeros = [2, 3, 1, 5, 6, 4, 7, 8, 9, 10];





