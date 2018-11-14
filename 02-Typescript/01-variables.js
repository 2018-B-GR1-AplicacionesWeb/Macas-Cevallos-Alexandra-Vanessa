// 02-typescript/01-variables.ts
// sudo npm i -g typescript
var nombre = '2312';
var edad = 12;
var nada = null;
var casado = false;
var loQueSea = {};
loQueSea = 1;
loQueSea = 'Facil';
loQueSea = true;
var fechaNacimiento = new Date();
var identificador = '1';
identificador = 1;
identificador = 'uno';
var Usuario = /** @class */ (function () {
    function Usuario() {
    }
    return Usuario;
}());
var usuario = {
    nombre: 'Adrian',
    apellido: 'Eguez'
};
usuario.edad = '2';
function sumarDosNumeros(numeroUno, numeroDos) {
    return numeroUno + numeroDos;
}
sumarDosNumeros(2, 2);
var saludar = function (nombre, apellido) {
    var infinito = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        infinito[_i - 2] = arguments[_i];
    }
    return 2;
};
var respuesta = saludar('nombre', 'eguez', 1, 2, 3, 4);
respuesta = respuesta.toUpperCase();
var nombreDos = 'adrian'; // duck typing
