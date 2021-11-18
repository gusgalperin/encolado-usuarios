import GenerarReporte from '../src/negocio/casosDeUso/generarReporte.js'
import JsonToExcel from '../src/utils/jsonToExcel.js'
import BaseTest from '../tests/baseTest.js'
import { v4 as uuidv4 } from 'uuid'
/* Ruiz, Daniel */
class GenerarReporteTests extends BaseTest {
    constructor(resumen) {
        super('Generar Reportes', resumen);
    }

    ejecutar = async ( res ) => {
        const cu = new GenerarReporte()
        const jsonToExcel = new JsonToExcel()
        const eventoId = uuidv4();
        try{
            //const eventoId = '4916b5ac-f12d-4901-ad32-b38ba3053499'
            
            const result = await cu.ejecutar({ eventoId: eventoId })
            const filePath = jsonToExcel.convertir(result.reporte, result.evento.codigo)
            
            console.log("Descarga Archivo: "+filePath+" Tamaño: "+ filePath.length)
            //res.download(filePath);
        }
        catch (err){
            throw new Error("Algo salio mal: "+err);
        }
    }
}

async function ejecutarReporteTests(resumen) {
    const nuevo = new GenerarReporteTests(resumen)
    await nuevo.ejecutar()
}

export { ejecutarReporteTests }