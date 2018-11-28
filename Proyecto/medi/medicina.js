const inquirer = require('inquirer');
const fs = require('fs');
const rxjs = require('rxjs');
const timer = require('rxjs').timer;
const mergeMap = require('rxjs/operators').mergeMap;
const map = require('rxjs/operators').map;
const retryWhen = require('rxjs/operators').retryWhen;
const delayWhen = require('rxjs/operators').delayWhen;
const preguntaMenu = {
    type: 'list',
    name: 'opcionMenu',
    message: 'Que quieres hacer',
    choices: [
        'Crear',
        'Borrar',
        'Buscar',
        'Actualizar',
    ]
};
const preguntaBuscarUsuario = [
    {
        type: 'input',
        name: 'idUsuario',
        message: 'Ingrese Codigo de la  Medicina',
    }
];
const preguntaUsuario = [
    {
        type: 'input',
        name: 'id',
        message: 'Cual es el codigo de la medicina'
    },
    {
        type: 'input',
        name: 'nombre',
        message: 'Cual es el nombre de la medicina'
    },
];
const preguntaEdicionUsuario = [
    {
        type: 'input',
        name: 'nombre',
        message: 'Cual es el nuevo nombre de la medicina'
    },
];
function inicialiarBDD() {
    return new Promise((resolve, reject) => {
        fs.readFile('bdd.json', 'utf-8', (error, contenidoArchivo) => {
            if (error) {
                fs.writeFile('bdd.json', '{"usuarios":[]}', (error) => {
                    if (error) {
                        reject({
                            mensaje: 'Error creando',
                            error: 500
                        });
                    }
                    else {
                        resolve({
                            mensaje: 'BDD leida',
                            bdd: JSON.parse('{"usuarios":[]}')
                        });
                    }
                });
            }
            else {
                resolve({
                    mensaje: 'BDD leida',
                    bdd: JSON.parse(contenidoArchivo)
                });
            }
        });
    });
}
async function main() {
    // 1) Inicializar bdd -- DONE
    // 2) Preguntas Menu -- DONE
    // 3) Opciones de Respuesta --  DONE
    // 4) ACCCION!!!!  -- DONE
    // 5) Guardar BDD --
    // of(Cualquier cosa JS)
    // from(Promesas)
    const respuestaBDD$ = rxjs.from(inicialiarBDD());
    respuestaBDD$
        .pipe(preguntarOpcionesMenu(), opcionesRespuesta(), ejecutarAcccion(), guardarBaseDeDatos())
        .subscribe((data) => {
        //
        console.log(data);
    }, (error) => {
        //
        console.log(error);
    }, () => {
        main();
        console.log('Complete');
    });
    /*
    try {
        const respuestaInicializarBDD:RespuestaBDD = <RespuestaBDD> await inicialiarBDD();
        const bdd = respuestaInicializarBDD.bdd;
        const respuestaMenu = await inquirer.prompt(preguntaMenu);
        switch (respuestaMenu.opcionMenu) {
            case 'Crear':
                // Preguntar datos del nuevo Medicina
                const medicina = await inquirer.prompt(preguntaUsuario);
                // CREAR USUARIO
                bdd.usuarios.push(medicina); // JS
                const respuestaGuardado = await guardarBDD(bdd);
                main();
                break;
        }
    } catch (e) {
        console.error(e)
    }
    */
}
function guardarBDD(bdd) {
    return new Promise((resolve, reject) => {
        fs.writeFile('bdd.json', JSON.stringify(bdd), (error) => {
            if (error) {
                reject({
                    mensaje: 'Error creando',
                    error: 500
                });
            }
            else {
                resolve({
                    mensaje: 'BDD guardada',
                    bdd: bdd
                });
            }
        });
    });
}
main();
function preguntarOpcionesMenu() {
    return mergeMap(// Respuesta Anterior Observable
    (respuestaBDD) => {
        return rxjs
            .from(inquirer.prompt(preguntaMenu))
            .pipe(map(// respuesta ant obs
        (respuesta) => {
            respuestaBDD.opcionMenu = respuesta;
            return respuestaBDD;
            // Cualquier cosa JS
        }));
        // OBSERVABLE!!!!!!!!!!
    });
}
function opcionesRespuesta() {
    return mergeMap((respuestaBDD) => {
        const opcion = respuestaBDD.opcionMenu.opcionMenu;
        switch (opcion) {
            case 'Crear':
                return rxjs
                    .from(inquirer.prompt(preguntaUsuario))
                    .pipe(map((medicina) => {
                    respuestaBDD.medicina = medicina;
                    return respuestaBDD;
                }));
            case 'Buscar':
                return consultarid(respuestaBDD);
            case 'Actualizar':
                return preguntarIdUsuario(respuestaBDD);
            case 'Borrar':
                return consultarid(respuestaBDD);
        }
    });
}
function guardarBaseDeDatos() {
    return mergeMap(// Respuesta del anterior OBS
    (respuestaBDD) => {
        // OBS
        return rxjs.from(guardarBDD(respuestaBDD.bdd));
    });
}
function ejecutarAcccion() {
    return map(// Respuesta del anterior OBS
    (respuestaBDD) => {
        const opcion = respuestaBDD.opcionMenu.opcionMenu;
        switch (opcion) {
            case 'Crear':
                const medicina = respuestaBDD.medicina;
                respuestaBDD.bdd.usuarios.push(medicina);
                return respuestaBDD;
            case 'Actualizar':
                const indice1 = respuestaBDD.indiceUsuario;
                respuestaBDD.bdd.usuarios[indice1].nombre = respuestaBDD.medicina.nombre;
                return respuestaBDD;
            case 'Buscar':
                const indice = respuestaBDD.indiceUsuario;
                if (indice === -1) {
                    console.error('error');
                }
                else {
                    console.log('Medicina Buscado', respuestaBDD.bdd.usuarios[indice]);
                }
                return respuestaBDD;
            case 'Borrar':
                const indice3 = respuestaBDD.indiceUsuario;
                if (indice3 === -1) {
                    console.error('error');
                }
                else {
                    console.log('Medicina Buscado', respuestaBDD.bdd.usuarios[indice3]);
                    const a = respuestaBDD.bdd.usuarios[indice3];
                    // indice3.splice(respuestaBDD.bdd.usuarios[indice],1)
                }
                return respuestaBDD;
        }
    });
}
function preguntarIdUsuario(respuestaBDD) {
    return rxjs
        .from(inquirer.prompt(preguntaBuscarUsuario))
        .pipe(mergeMap(// RESP ANT OBS
    (respuesta) => {
        const indiceUsuario = respuestaBDD.bdd
            .usuarios
            .findIndex(// -1
        (medicina) => {
            return medicina.id === respuesta.idUsuario;
        });
        if (indiceUsuario === -1) {
            console.log('preguntando de nuevo');
            return preguntarIdUsuario(respuestaBDD);
        }
        else {
            respuestaBDD.indiceUsuario = indiceUsuario;
            return rxjs
                .from(inquirer.prompt(preguntaEdicionUsuario))
                .pipe(map((nombre) => {
                respuestaBDD.medicina = {
                    id: null,
                    nombre: nombre.nombre
                };
                return respuestaBDD;
            }));
        }
    }));
}
function consultarid(respuestaBDD) {
    return rxjs
        .from(inquirer.prompt(preguntaBuscarUsuario))
        .pipe(map(// RESP ANT OBS
    (respuesta) => {
        const indiceUsuario = respuestaBDD.bdd
            .usuarios
            .findIndex(// -1
        (medicina) => {
            return medicina.id === respuesta.idUsuario;
        });
        respuestaBDD.indiceUsuario = indiceUsuario;
        return respuestaBDD;
    }));
}
