const fs = require('fs');

/*const nuevaPromesaLectura = new Promise(
    (resolve) => {
        fs.readFile('06-texto23.txt', 'utf-8',
            (err, contenidoArchivo) => {
                if (err) {
                    resolve('');
                } else {
                    resolve(contenidoArchivo);
                }
            });
    }
);


const nuevaPromesaEscritura = (contenidoLeido) => {
    return new Promise(
        (resolve, reject) => {

            const contenido = contenidoLeido ? contenidoLeido + 'Otro ola' : 'Otro ola';

            fs.writeFile('06-texto23.txt', contenido,
                (err,) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(contenido);
                    }
                });
        }
    );
};

nuevaPromesaLectura
    .then(
        (contenidoArchivo) => {
            console.log('Todo bien', contenidoArchivo);
            return nuevaPromesaEscritura(contenidoArchivo)
        }
    )
    .then(
        (contenidoCompleto) => {
            console.log('Contenido completo', contenidoCompleto);
        }
    )
    .catch(
        (resultadoError) => {
            console.log('Algo malo paso', resultadoError);
        }
    );
    */
/*const appendFilePromesaLectura = new Promise(
    //NOMBRE DEL ARCHIVO Y CONTENIDO
    //SI NO EXISTE CREAR, SI EXISTE AUMENTAR AL FINAL
    (resolve) => {
        fs.readFile('06-texto1.txt', 'utf-8',
            (err, contenidoArchivo) => {
                if(err){
                    resolve('');
                } else {
                    resolve(contenidoArchivo);
                }
            });
    }
);

const appendFilePromesaEscritura = (contenidoLeido, contenidoNuevo) => {
    return new Promise(
        //NOMBRE DEL ARCHIVO Y CONTENIDO
        //SI NO EXISTE CREAR, SI EXISTE AUMENTAR AL FINAL
        (resolve) => {
            const contenido = contenidoLeido? contenidoLeido+ contenidoNuevo: contenidoNuevo;
            fs.writeFile('06-texto1.txt', contenido,
                (err, contenidoArchivo) => {
                    if(err){
                        reject(err);
                    } else {
                        resolve(contenidoArchivo);
                    }
                });
        }
    );
};

appendFilePromesaLectura
    .then(
        (contenidoArchivo)=>{
            console.log('Contenido ', contenidoArchivo);
            const contenidoNuevo = 'asdfghjkl';
            return appendFilePromesaEscritura(contenidoArchivo, contenidoNuevo)
        }
    )
    .then(
        (contenidoCompleto) => {
            console.log('Contenido ', contenidoCompleto)
        }
    )
    .catch(
        (resultadoError) => {
            console.log('No se escribió el archivo ', resultadoError);
        }
    );*/

/*
const promesaAppendFile = (nombreArchivo,contenidoArchivo)=>{
    return new Promise(
        (resolve, reject) => {
            fs.readFile(nombreArchivo,'utf-8',
                (error,contenidoArchivoLeido)=>{
                    if(error){
                        //si no hay archivo, creamos el archivo con write
                        fs.writeFile(nombreArchivo, contenidoArchivo,
                            (err)=>{
                                if(err){
                                    console.error('Error escribiendo');
                                    reject(err)
                                }else{
                                    console.error('Archivo Creado');
                                    resolve(contenidoArchivo)

                                }
                            }
                        );
                    }else {
                        fs.writeFile(nombreArchivo, contenidoArchivoLeido +contenidoArchivo,
                            (err)=>{
                                if(err){
                                    console.error('Error escribiendo');
                                    reject(err)
                                }else{
                                    console.error('Archivo Creado');
                                    resolve(contenidoArchivoLeido +contenidoArchivo)
                                }
                            }
                        );
                    }
                }
            );
        }
    )
}


console.log(promesaAppendFile);
promesaAppendFile('08-archivo.txt','holaaa')
    .then(  //-->esto salio bien
        (contenidoArchivo) => {
            console.log('Todo Bien', contenidoArchivo);
            return promesaAppendFile(contenidoArchivo);
        }
    )
    .catch(
        (resultadoError) => {
            console.log('algo malo', resultadoError);
        }
    )
/*

 */


function ejercicioDeArchivos(arregloStrings) {
    return new Promise(
        (resolve) => {


            const arregloRespuestas = [];


            arregloStrings
                .forEach(
                    (string, indice) => {
                        const archivo = `${indice}-${string}.txt`;
                        const contenido = string;
                        fs.writeFile(archivo,
                            contenido,
                            (err) => {
                                const respuesta = {
                                    nombreArchivo: archivo,
                                    contenidoArchivo: contenido,
                                    error: err
                                };
                                arregloRespuestas.push(respuesta);
                                const tamanoRespuestas = arregloRespuestas.length;
                                if (tamanoRespuestas === arregloStrings.length)
                                    resolve(arregloRespuestas);

                            });
                    }
                );


        });
}

const arregloStrings = ['A', 'B', 'C'];


ejercicioDeArchivos(arregloStrings)
    .then((Respuesta) => {
        console.log(Respuesta)
    })




