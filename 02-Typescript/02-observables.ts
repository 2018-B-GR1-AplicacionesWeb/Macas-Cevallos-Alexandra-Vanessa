// 02-observables.ts
// import { PaqueteUno, Paquete dos} from 'rxjs';
// import * as rxjs from 'rxjs';
// import {Observable} from "rxjs";

declare var require:any;

// declare var module:any;

const rxjs = require('rxjs');

const observableUno$ = rxjs.of(1, {nombre: 'ale'}, 3, [1,2,3], 5, 6, 7);

console.log(observableUno$);

observableUno$
    .subscribe(
        (ok) => {
            console.log('En ok', ok);
        },
        (error) => {
            console.log(error);
        },
        () => {
            console.log('Completado');
        }
    );
