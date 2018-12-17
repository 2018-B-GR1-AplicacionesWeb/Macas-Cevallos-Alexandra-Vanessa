
import {
    Get,
    Controller,
    Request,
    Response,
    Headers,
    HttpCode,
    HttpException,
    Query,
    Param,
    Res,
    Post, Body
} from '@nestjs/common';
import {Medicina,AppService} from './app.service';
import {Observable, of} from "rxjs";




@Controller()
export class AppController {
    constructor(private readonly _appService: AppService) {
    }

    @Get('inicio')
    inicio(
        @Res() response
    ) {
        response.render('inicio', {
            nombre: 'Medicamentos',
            arreglo: this._appService.medicina
        });
    }

////crear


    @Get('crear')
    crear(
        @Res() response
    ) {
        response.render(
            'crear'
        )
    }
///borrar
    @Post('eliminar/:codmedicina')
    borrar(
        @Param('codmedicina') codmedicina: string,
        @Res() response
    ) {
        this._appService.borrar(Number(codmedicina));

        response.redirect('/Medicina/inicio');
    }


///actualizar
    @Get('actualizar/:codmedicina')
    actualizar(
        @Param('codmedicina') codmedicina: string,
        @Res() response
    ) {
        const usuarioAActualizar = this
            ._appService
            .mostrar(Number(codmedicina));

        response.render(
            'crear', {
                usuario: usuarioAActualizar
            }
        )
    }

    @Post('crear')
    crearf(
        @Body() medicina: Medicina,
        @Res() response
    ) {

        this._appService.crear(medicina);
        response.redirect('/Medicina/inicio')
    }
    @Post('actualizar')
    actualizarf(
        @Body() medicina: Medicina,
        @Param('codmedicina') codmedicina: string,
        @Res() response
    ) {

        this._appService.actualizarf(Number(codmedicina), medicina);
        response.redirect('/Medicina/inicio')
    }





}


