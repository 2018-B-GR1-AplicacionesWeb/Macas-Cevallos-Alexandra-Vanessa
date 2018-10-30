// 07-promesas.js

const fs = require('fs');

const nuevaPromesaLectura = new Promise(
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
        (contenidoArchivoLeido) => {
            if (error) {
                fs.writeFile(nombreArchivo, contenidoArchivo,
                    (err) => {
                        console.log('Archivo creado');
                        nuevaPromesaEscritura(contenidoArchivoLeido)
                    }
                );
            }
            (contenidoArchivo) => {
                console.log('Todo bien', contenidoArchivo);
                return nuevaPromesaEscritura(contenidoArchivo)
            }

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
        }

appendFile('07-texto.txt',
    '\n Promesa',
    (contenidoArchivo, reject) => {
        if (reject) {
            console.log('Error', reject);
        } else {
            // contenidoArchivo
        }
    }
);
