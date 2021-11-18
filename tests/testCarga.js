import CargaMasiva from '../src/negocio/casosDeUso/cargaMasiva.js'
import Evento from '../src/negocio/entidades/evento.js';
import BaseTest from '../tests/baseTest.js'
import { v4 as uuidv4 } from 'uuid'
import CrearEvento from '../src/negocio/casosDeUso/crearEvento.js'

/*
Autor: Germán Mansilla
*/

class CargaMasivaTest extends BaseTest{

    constructor(resumen){
        super("cargando eventos", resumen)
    }
    ejecutar = async () =>{
        const tests=[
            {desc: "evento existente", test: this.eventoExistente },
            {desc: "eventos", test: this.cargarEventos},
        ];
        await this.run(tests)
    }

    cargarEventos = async () =>{
        let cargaM = new CargaMasiva();
        let archivo = './tests/eventos.xlsx'
        try{
            let resultado = await cargaM.ejecutar({fileName: archivo})
            console.log(`se crearon ${resultado.length} los eventos`);
        } catch(error){
            throw new Error (`Ocurrio un error: ${error}`)
        }
    }
   
}
async function ejecutarCargaMasiva(resumen){
    const cm = new CargaMasivaTest(resumen)
    await cm.ejecutar()
}


export { ejecutarCargaMasiva }