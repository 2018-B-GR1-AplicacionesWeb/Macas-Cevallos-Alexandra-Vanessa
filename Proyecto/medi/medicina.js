var inquirer = require('inquirer');
var rxjs = require('rxjs');
var fs = require('fs');
var map = require('rxjs/operators').map;
var reduce = require('rxjs/operators').reduce;
// Iniciando datos
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
var Cliente = /** @class */ (function () {
    function Cliente() {
    }
    return Cliente;
}());
var Med = /** @class */ (function () {
    function Med(tipo) {
        this.tipo = tipo;
    }
    return Med;
}());
var Orden = /** @class */ (function () {
    function Orden(pizza, cantidad) {
        var _this = this;
        this.valor_detalle = 0.0;
        this.toString = function () {
            var espacios = "            ";
            return "" + _this.medi.tipo + espacios.substring(_this.medi.tipo.length) + _this.cantidad + espacios.substring(String(_this.cantidad).length);
        };
        this.medi = pizza;
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
//---------------PREGUNTAS
// preguntas del menu principal
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
var preguntas_login_administrador = [
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
            if (answer !== 'admin') {
                return 'Password required!';
            }
            return true;
        }
    },
];
var preguntas_crud = [
    {
        type: "list",
        name: "crud_op",
        message: "Que desea hacer",
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
var pregunta_actualizar = [
    {
        type: 'input',
        name: "old",
        message: "Ingrese tipo de medi a actualizar?"
    },
    {
        type: 'input',
        name: "nuevo",
        message: "Ingrese el nuevo tipo de medi para reemplazar?"
    }
];
var pregunta_eliminar = [
    {
        type: "input",
        name: 'borrar',
        message: "Ingrese tipo de medi a eliminar?",
    }
];
var pregunta_insertar = [
    {
        type: "input",
        name: 'insert',
        message: "Ingrese tipo de medi a insertar?",
    },
    {
        type: 'input',
        name: "saldo",
        message: "Ingrese el precio de medi para reemplazar?",
        validate: function (value) {
            var valid = !isNaN(parseFloat(value));
            return valid || "Por favor ingrese un numero valido";
        },
        filter: Number
    }
];
var preguntas_menu_secundario = [
    {
        type: "list",
        name: "clase",
        message: "Que clase de medi",
        choices: medicinalis,
        filter: function (val) { return val.toLowerCase(); }
    },
    {
        type: "input",
        name: "cantidad",
        message: "Cuantas necesitas",
        validate: function (value) {
            var valid = !isNaN(parseFloat(value));
            return valid || "Por favor ingrese un numero valido";
        },
        filter: Number
    },
    {
        type: "confirm",
        name: "seguir",
        message: "Desea algo mas?",
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
                .prompt(preguntas_login_administrador)
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
                    pedir_pizza(pedido);
                }
            });
        }
    });
}
function menu_crud() {
    inquirer
        .prompt(preguntas_crud)
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
                        .prompt(pregunta_actualizar)
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
                        .prompt(pregunta_eliminar)
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
                        .prompt(pregunta_insertar)
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
function pedir_pizza(pedido) {
    inquirer
        .prompt(preguntas_menu_secundario)
        .then(function (respuestas) {
        var pizza = new Med(respuestas.clase);
        var cantidad = respuestas.cantidad;
        pedido.ordenes.push(new Orden(pizza, cantidad));
        if (respuestas.seguir) {
            pedir_pizza(pedido);
        }
        else {
            console.log('-------------------------------------------' +
                '\nDetalle de la medicina solicitada\n' +
                '-----------------------------------------\n' +
                'Detalle,Precio  Cantidad    \n' +
                '.............................');
            pedido.mostrar_ordenes();
            console.log("........................");
        }
    });
}
iniciar();
