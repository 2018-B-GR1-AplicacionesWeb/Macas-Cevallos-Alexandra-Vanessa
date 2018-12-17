import { Injectable } from '@nestjs/common';

@Injectable()

export class AppService {
    medicina: Medicina[] = [

        {
            codigo: 1,
            nombre: 'Tempra',
            descripcion: 'Dos pastillas cada 2 horas',
            fecha: '02/02/2018'
            //new(year: number, month: number, date?: number, hours?: number, minutes?: number, seconds?: number, ms?: number)
        },




        {
            codigo: 2,
            nombre: 'Paracetamol',
            descripcion: 'Tomar tres pastillas despues de la comidad cada 3 horas',
           fecha: '01/10/2018'
        },


        {
          codigo: 3,
            nombre: 'Iboprufeno',
            descripcion: 'Tomar cada 6 horas despues del alimento',
            fecha: '03/04/2017'

        }
    ];
    registroActual = 4;

    crear(nueva: Medicina): Medicina {
        nueva.codigo = this.registroActual;
        this.registroActual++;
        this.medicina.push(nueva);
        return nueva;
    }

    actualizarf(codmedicina: number,
               nueva: Medicina): Medicina {
        const indice = this.medicina.findIndex(
                (medicina) => medicina.codigo === codmedicina
            );
        this.medicina[indice] = nueva;
        return nueva;
    }

    borrar(codmedicina: number): Medicina {
        const indice = this
            .medicina
            .findIndex(
                (medicina) => medicina.codigo === codmedicina
            );
        const eliminar = JSON.parse(
            JSON.stringify(this.medicina[indice])
        );


        this.medicina.splice(indice, 1);
        return eliminar;
    }

    mostrar(codmedicina: number) {
        return this.medicina

            .find(
                (medicina) => {
                    return medicina.codigo === codmedicina
                }
            );
    }


}

export interface Medicina {
    codigo: number;
    nombre: string;
    descripcion: string;
    fecha: string;
}