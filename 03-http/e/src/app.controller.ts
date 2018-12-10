import {
    Get,
    Controller,
    Post,
    HttpCode,
    UnauthorizedException,
    Body,
    Req,
    Res,
    Query,
    Put,
    Delete
} from '@nestjs/common';
import { AppService } from './app.service';
import {Request, Response} from 'express';
import {Profiler} from "inspector";
//import PositionTickInfo = module
import $JestEnvironment = jest.$JestEnvironment;
import {Observable, of} from "rxjs";


@Controller()
export class AppController {
    [x: string]: any;
  constructor(private readonly appService: AppService) {}

  @Get()
  root(): string {
    return 'hii';
  }

  @Post()
  rooxt():string{
    return 'd'
  }
    @Post('crearMedicina')
    @HttpCode(200)  // Codigo OK
    crearMedicina(
        @Res() res: Response,
        @Req() req: Request | any,
        @Body() medicina: Medicina,
        @Body('nombre') nombre1: string,
        @Body(' presentacion') presentacion: string,
        @Body('precio') precio: number,
        @Body('fecha') fecha: Date,


    ) {

        const bdd = this._appService.crearMedicina(medicina);
        console.log(medicina);
        res.json(bdd);

    }

    ////crearTipo
    @Post('crearTipo')
    @HttpCode(200)  // Codigo OK
    crearTipo(
        @Res() res: Response,
        @Req() req: Request | any,
        @Body() tipomedicina: TipoMedicina,
        @Body('nombre') nombre: string,
        @Body(' uso') uso: string,
        @Body('cantidad') cantidad: number,
        @Body('fecha') fecha: Date,


    ) {

        const bdd = this._appService.crearTipo(tipomedicina);
        console.log(tipomedicina);
        res.json(bdd);

    }
    ///// buscar medicina
    @Get('buscarMedicina')

    @HttpCode(204) // status
    buscarMedicina(

        @Query('nombre') nombre1: Medicina,
    ) {

        return  nombre1.nombre1;
    }
    ///buscar tipodemedicina
    @Get('buscarTipoMedicina')

    @HttpCode(204) // status
    buscarTipoMedicina(

        @Query('nombre') nombre: TipoMedicina, // adrian
    ) {

        return  nombre.nombre ;
    }
    ///actualizar
    @Put('actualizarMedicina')

    @HttpCode(204) // status
    actualizarMedicina(

        @Query('nombre') nombre1: Medicina,
    ) {

        return  nombre1.nombre1;
    }

///wliminar
    @Delete('eliminarMedicina')

    @HttpCode(204) // status
    eliminarMedicina(

        @Query('nombre') nombre1: Medicina,

    ) {
        const  respuestaBDD = RespuestaBDD.indiceMedicina;
        const a = respuestaBDD.bdd.medicina
        a.splice(respuestaBDD.bdd.medicina[nombre1],1)

        //    medicina.splice(respuestaBDD.bdd.usuarios[indice3],1);


        // indice3.splice(respuestaBDD.bdd.usuarios[indice],1)
        return respuestaBDD;
    }








}




export interface Medicina {
    nombre1: string;
    presentacion: string;
    precio: number;
    fecha: Date;

}

export interface TipoMedicina {
    nombre: string;
    uso: string;
    cantidad: number;
    fecha: Date;

}

