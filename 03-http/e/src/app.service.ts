import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import {Medicina, TipoMedicina} from './app.controller';
import * as rxjs from "rxjs";
//import {mergeMap} from 'rxjs/operators'.mergeMap;
//import * as map from 'rxjs/operators';
const mergeMap = require('rxjs/operators').mergeMap;
const map = require('rxjs/operators').map;

@Injectable()
export class AppService {
    bdd: Medicina[] = [];   // ARCHIVO .JSON

  //  crearMedicina(medicina: Medicina) {
    //    this.bdd.push(medicina);
      //  return this.bdd;
 //   }

    crearMedicina(medicina: Medicina) {
            inicialiarBDD();
            const  respuestaBDD : RespuestaBDD;
             medicina = respuestaBDD.Medicina;
             respuestaBDD.bdd.medicina.push(medicina);

        }
        crearTipo(tipomedicina: TipoMedicina) {
            inicialiarBDD();
            const  respuestaBDD : RespuestaBDD;
             tipomedicina = respuestaBDD.TipoMedicina;
             respuestaBDD.bdd.tipomedicina.push(tipomedicina);

        }

    buscarMedicina(respuestaBDD: RespuestaBDD){
        const indice = respuestaBDD.bdd
            .medicina
            .findIndex( // -1
                (medicina: any) => {

                    return medicina.indiceMedicina === indice;

                }
            );

        respuestaBDD = indice;

        return respuestaBDD;

        }

    buscarTipoMedicina(respuestaBDD: RespuestaBDD){
        const indice = respuestaBDD.bdd.Tipomedicina
                      .findIndex( // -1
                (tipomedicina: any) => {

                    return tipomedicina.indiceTipoMedicina === indice;

                }
            );

        respuestaBDD = indice;

        return respuestaBDD;

    }

    actualizarMedicina(respuestaBDD: RespuestaBDD){
        const indice = respuestaBDD.bdd
            .medicina
            .findIndex( // -1
                (medicina: any) => {

                   if  (medicina.indiceMedicina === indice){
                    map(
                        (nombre:{nombre1:string})=>{
                            respuestaBDD.medicina ={
                                nombre:nombre
                            };
                            return respuestaBDD;
                        }

                }
                );
    }


        return respuestaBDD;

    }

    ////eliminar

eliminarMedicina(respuestaBDD: RespuestaBDD){
    const indice = respuestaBDD.bdd
        .medicina
        .findIndex( // -1
            (medicina: any) => {

                if  (medicina.indiceMedicina === indice){
                    map(
                        (nombre:{nombre1:string})=>{
                            respuestaBDD.medicina ={
                                nombre:nombre
                            };
                            return respuestaBDD;
                        }

                }
            );
}
}



}
function inicialiarBDD() {

    return new Promise(
        (resolve, reject) => {
            fs.readFile(
                'bdd.json',
                'utf-8',
                (error, contenidoArchivo) => { // CALLBACK
                    if (error) {

                        fs.writeFile(
                            'bdd.json',
                            '{"medicina":[],"tipodemedicina":[]}',
                            (error) => {
                                if (error) {
                                    reject({
                                        mensaje: 'Error crear',
                                        error: 500
                                    })
                                } else {
                                    resolve({
                                        mensaje: 'BDD leida',
                                        bdd: JSON.parse('{"medicina":[],"tipodemedicina":[]}')
                                    })
                                }

                            }
                        )

                    } else {
                        resolve({
                            mensaje: 'BDD leida',
                            bdd: JSON.parse(contenidoArchivo)
                        })
                    }
                }
            )
        }
    );

}


function guardarBDD(bdd: BDD) {
    return new Promise(
        (resolve, reject) => {
            fs.writeFile(
                'bdd.json',
                JSON.stringify(bdd),
                (error) => {
                    if (error) {
                        reject({
                            mensaje: 'Error crear',
                            error: 500
                        })
                    } else {
                        resolve({
                            mensaje: 'BDD guardada',
                            bdd: bdd
                        })
                    }

                }
            )
        }
    )
}
function guardarBaseDeDatos() {
    return mergeMap(// Respuesta del anterior OBS
        (respuestaBDD: RespuestaBDD) => {
            // OBS
            return rxjs.from(guardarBDD(respuestaBDD.bdd))
        }
    )
}



    // of(Cualquier cosa JS)
    // from(Promesas)

 //   const respuestaBDD$ = rxjs.from(inicialiarBDD());

   // respuestaBDD$
     //   .pipe(


       //     guardarBaseDeDatos()
        //)







interface RespuestaBDD {
    mensaje: string;
    bdd: BDD;
    medicina?: Medicina;
    indiceMedicina?: number;
    tipomedicina?: TipoMedicina;
    indiceTipoMedicina?: number;

}

interface BDD {
    medicina: Medicina[] | any;
    Tipomedicina: TipoMedicina[] | any;

}


