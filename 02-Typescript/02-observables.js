// 02-observables.ts
// import { PaqueteUno, Paquete dos} from 'rxjs';
// import * as rxjs from 'rxjs';
// import {Observable} from "rxjs";
// declare var module:any;
var rxjs = require('rxjs');
var observableUno$ = rxjs.of(1, { nombre: 'ale' }, 3, [1, 2, 3], 5, 6, 7);
console.log(observableUno$);
observableUno$
    .subscribe(function (ok) {
    console.log('En ok', ok);
}, function (error) {
    console.log(error);
}, function () {
    console.log('Completado');
});
