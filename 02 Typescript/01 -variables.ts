const nombre: string = '1';
const edad : number =12;
const   nada: null;
const  casado: boolean = false;
const  loquesea: any = {};

const  fechadeNaciemito:Date = new Date();


let  identificador: number | string = '1';
identificador = 1;
identificador = 'hola';
//tsc nombreArchivo --target es 2017
 const usuario: {
nombre: string
     apellido:string
     edad?: number | string
 }=
     {
         nombre: 'Adrian',
     apellido: 'Eguez'
 };
usuario.edad = '2';

interface UsuarioInterface{
    nombre: string
    apellido:string
    edad?: number | string
}
const usuario: UsuarioInterface = {
    nombre: 'Adrian',
    apellido: 'Eguez'
}


