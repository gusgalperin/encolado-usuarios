import CargaMasiva from '../src/negocio/casosDeUso/cargaMasiva.js'
import Evento from '../src/negocio/entidades/evento.js';
import BaseTest from '../tests/baseTest.js'
import { v4 as uuidv4 } from 'uuid'
import CrearEvento from '../src/negocio/casosDeUso/crearEvento.js'


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

    eventoExistente = async () => {
        const id = uuidv4();
        let crear = new CrearEvento();
        try {
            await crear.ejectuar(id, "EVENTO 1", "1/11/21 17:00", "1/11/21 18:00","1/11/21 11:00",3,4)
        } catch(error){
            throw new Error("Ya existe el evento con el id" + id)
        }
    }

    cargarEventos = async () =>{
        let cargaM = new CargaMasiva();
        let archivo = '/Users/germanmansilla/Documents/Repo/TP-TP2/2daEntrega/archivo/eventos.xlsx'
        try{
            let resultado = await cargaM.ejecutar(archivo)
            console.log(`se crearon ${resultado.length} los eventos`);
        } catch(error){
            throw new Error (`Ocurrio un error: ${error}`)
        }
    }
   
}
async function ejecutarCargaMasiva(resumen){
    const cm = new CargaMasivaTest(resumen)
    cm.ejecutar()
}


export { ejecutarCargaMasiva }