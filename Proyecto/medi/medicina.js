var inquirer = require('inquirer');
var rxjs = require('rxjs');
var fs = require('fs');
var map = require('rxjs/operators').map;
var reduce = require('rxjs/operators').reduce;
var AppendFile = function (nombreArchivo, contenido, replace) {
    // @ts-ignore
    return new Promise(function (resolve, reject) {
        fs.readFile(nombreArchivo, 'utf-8', function (error, contenidoArchivo) {
            if (error) {
                fs.writeFile(nombreArchivo, contenido, function (error) {
                    if (error) {
                        reject(error);
                    }
                    else {
                        resolve(contenido);
                    }
                });
            }
            else {
                fs.writeFile(nombreArchivo, 
                //contenidoArchivo+contenido,
                replace == true ? contenido : contenidoArchivo + contenido, function (error) {
                    if (error) {
                        reject(error);
                    }
                    else {
                        resolve(contenido);
                    }
                });
            }
        });
    });
};
// Cargar datos
var GetData = function (nombreArchivo) {
    // @ts-ignore
    return new Promise(function (resolve, reject) {
        fs.readFile(nombreArchivo, 'utf-8', function (error, contenidoArchivo) {
            if (error) {
                reject(error);
            }
            else {
                resolve(contenidoArchivo);
            }
        });
    });
};
var medicinalis = [];
GetData('DataBase/medicinas')
    .then(function (contenido) {
    String(contenido).split("||").forEach(function (value) {
        medicinalis.push(value);
    });
});
// Entidades
var Med = /** @class */ (function () {
    function Med(tipo) {
        this.tipo = tipo;
    }
    return Med;
}());
var Orden = /** @class */ (function () {
    function Orden(Medicina, cantidad) {
        var _this = this;
        this.toString = function () {
            var espacios = "         ";
            return "" + _this.medi.tipo + espacios.substring(_this.medi.tipo.length) + _this.cantidad + espacios.substring(String(_this.cantidad).length);
        };
        this.medi = Medicina;
        this.cantidad = cantidad;
        //   this.valor_detalle=this.cantidad*this.medi.precio;
    }
    return Orden;
}());
var Pedido = /** @class */ (function () {
    function Pedido() {
        this.ordenes = [];
    }
    Pedido.prototype.mostrar_ordenes = function () {
        this.ordenes.forEach(function (orden) {
            console.log(orden.toString());
        });
    };
    ;
    return Pedido;
}());
var preguntasMenu = [
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
var login = [
    {
        type: "list",
        name: "sesion",
        message: "Ingreso:",
        choices: ['Admin', 'Cliente'],
        filter: function (val) { return val.toLowerCase(); }
    },
];
var preguntas_login = [
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
            if (answer !== '1234') {
                return 'Password required!';
            }
            return true;
        }
    },
];
var CRUD = [
    {
        type: "list",
        name: "crud_op",
        message: "Escoja una opcion",
        choices: ['Consultar', 'Modificar', 'Eliminar', 'Nueva', 'salir'],
        validate: function (respuesta) {
            if (respuesta.crud_op == 'salir') {
                return false;
            }
            else {
                return respuesta;
            }
        }
    }
];
var actualizar = [
    {
        type: 'input',
        name: "old",
        message: "Ingrese nombre del medicamento?"
    },
    {
        type: 'input',
        name: "nuevo",
        message: "Ingrese el nuevo nombre de medicamento?"
    }
];
var eliminar = [
    {
        type: "input",
        name: 'borrar',
        message: "Ingrese nombre de medicamento?",
    }
];
var insertar = [
    {
        type: "input",
        name: 'insert',
        message: "Ingrese nombre de medicamento:",
    },
    {
        type: 'input',
        name: "saldo",
        message: "Ingrese el precio:",
        validate: function (value) {
            var valid = !isNaN(parseFloat(value));
            return valid || "Por favor ingrese un numero valido";
        },
        filter: Number
    }
];
var menu_secundario = [
    {
        type: "list",
        name: "clase",
        message: "medicamento",
        choices: medicinalis,
        filter: function (val) { return val.toLowerCase(); }
    },
    {
        type: "input",
        name: "cantidad",
        message: "Cantidad",
        validate: function (value) {
            var valid = !isNaN(parseFloat(value));
            return valid || "Por favor ingrese un numero valido";
        },
        filter: Number
    },
    {
        type: "confirm",
        name: "seguir",
        message: "Nueva compra?",
    },
];
// Ejecutar menu_principal
function iniciar() {
    inquirer
        .prompt(login)
        .then(function (respuestas) {
        if (respuestas.sesion == 'admin') {
            // Menu administrador
            inquirer
                .prompt(preguntas_login)
                .then(function (respuestas) {
                if (respuestas.clave) {
                    menu_crud();
                }
                else {
                    console.log(respuestas.clave);
                    iniciar();
                }
            });
        }
        else {
            inquirer
                .prompt(preguntasMenu)
                .then(function (respuestas) {
                if (respuestas.opciones != 'Salir') {
                    console.log('Eliga una medi del menu:');
                    var pedido = new Pedido();
                    pedidos(pedido);
                }
            });
        }
    });
}
function menu_crud() {
    inquirer
        .prompt(CRUD)
        .then(function (respuestas) {
        if (respuestas.crud_op === 'salir') {
            console.log(respuestas.clave);
            iniciar();
        }
        else {
            switch (respuestas.crud_op) {
                case 'Consultar':
                    medicinalis.forEach(function (valor) {
                        console.log(valor);
                    });
                    break;
                case 'Modificar':
                    inquirer
                        .prompt(actualizar)
                        .then(function (respuestas) {
                        //buscar y reemplazar
                        medicinalis.forEach(function (element, index, array) {
                            if (element == String(respuestas.old)) {
                                console.log('econtrado');
                                array[index] = respuestas.nuevo;
                            }
                            console.log(element + "," + respuestas.old);
                        });
                        var contenido = '';
                        var pizza$ = rxjs.from(medicinalis);
                        pizza$
                            .subscribe(function (ok) {
                            contenido = contenido + ok + "||";
                        }, function (error) {
                            console.log("error:", error);
                        }, function () {
                            // volver a actualizar la base
                            AppendFile('DataBase/medicinas', contenido, true)
                                .then(function () {
                                console.log('contenido actualizado');
                                menu_crud();
                            });
                        });
                    });
                    break;
                case 'Eliminar':
                    inquirer
                        .prompt(eliminar)
                        .then(function (respuestas) {
                        //buscar y reemplazar
                        medicinalis.forEach(function (element, index, array) {
                            if (element == String(respuestas.borrar)) {
                                console.log('econtrado');
                                array[index] = '';
                            }
                            console.log(element + "," + respuestas.borrar);
                        });
                        var contenido = '';
                        var pizza$ = rxjs.from(medicinalis);
                        pizza$
                            .subscribe(function (ok) {
                            if (ok) {
                                contenido = contenido + ok + ",";
                            }
                        }, function (error) {
                            console.log("error:", error);
                        }, function () {
                            // volver a actualizar la base
                            AppendFile('DataBase/medicinas', contenido, true)
                                .then(function () {
                                console.log('contenido actualizado');
                                menu_crud();
                            });
                        });
                    });
                    break;
                case 'Nueva':
                    inquirer
                        .prompt(insertar)
                        .then(function (respuestas) {
                        console.log(respuestas);
                        var res1 = respuestas.insert;
                        var res2 = respuestas.saldo;
                        medicinalis.push(res1 + ',' + res2);
                        //  medicinas.push(res2 + ';');
                        // medicinas.push(respuestas.insert);
                        // medicinas.push(respuestas.saldo);
                        var contenido = '';
                        var pizza$ = rxjs.from(medicinalis);
                        pizza$
                            .subscribe(function (ok) {
                            if (ok) {
                                contenido = contenido + ok + "||";
                            }
                        }, function (error) {
                            console.log("error:", error);
                        }, function () {
                            // volver a actualizar la base
                            AppendFile('DataBase/medicinas', contenido, true)
                                .then(function () {
                                console.log('contenido actualizado');
                                menu_crud();
                            });
                        });
                    });
                    break;
            }
            //menu_crud();
        }
    });
}
function pedidos(pedido) {
    inquirer
        .prompt(menu_secundario)
        .then(function (respuestas) {
        var medicamento = new Med(respuestas.clase);
        var cantidad = respuestas.cantidad;
        pedido.ordenes.push(new Orden(medicamento, cantidad));
        if (respuestas.seguir) {
            pedidos(pedido);
        }
        else {
            console.log('-------------------------------------------' +
                '\nDetalle de la medicina solicitada\n' +
                '-----------------------------------------\n' +
                'Detalle,$0.0 Cantidad    \n' +
                '.............................');
            pedido.mostrar_ordenes();
            console.log("........................");
        }
    });
}
iniciar();
