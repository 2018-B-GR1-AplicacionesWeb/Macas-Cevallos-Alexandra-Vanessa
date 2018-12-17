import {Injectable} from '@nestjs/common';
import {Usuario} from './app.controller';

@Injectable()
export class AppService {
    bdd: Usuario[] = [];   // ARCHIVO .JSON

    crearUsuario(usuario: Usuario) {
        this.bdd.push(usuario);
        return this.bdd;
    }

    // CONVERTIRNOS EN UN CLIENTE -> HTTP GET FACEBOOK
    // AXIOS
    // MYSQL
}
