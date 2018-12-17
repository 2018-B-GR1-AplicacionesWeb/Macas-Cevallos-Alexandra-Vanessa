// 02-typescript/01-variables.ts

// sudo npm i -g typescript

const nombre: string = '2312';
const edad: number = 12;
const nada = null;
const casado: boolean = false;
let loQueSea: any = {};
loQueSea = 1;
loQueSea = 'Facil';
loQueSea = true;
const fechaNacimiento: Date = new Date();

let identificador: number | string = '1';
identificador = 1;
identificador = 'uno';

// tsc nombreArchivo --target es2015

interface UsuarioInterface {
    nombre: string;
    apellido: string;
    edad?: number | string;
}

class Usuario {
    public nombre: string;
    public apellido: string;
    public edad?: number | string;
}

const medicina: Usuario =
    {
        nombre: 'Adrian',
        apellido: 'Eguez'
    };
medicina.edad = '2';

function sumarDosNumeros(
    numeroUno: number,
    numeroDos: number
) {
    return numeroUno + numeroDos;
}

sumarDosNumeros(2, 2);


const saludar = (nombre: string,
                 apellido?: string,
                 ...infinito: number[]):any => {
    return 2;
};


let respuesta = <string> saludar('nombre',
    'eguez',
    1, 2, 3, 4);
respuesta = respuesta.toUpperCase();

let nombreDos = 'adrian'; // duck typing

