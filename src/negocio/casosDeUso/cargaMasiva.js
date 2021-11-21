import ExcelToJson from "../../utils/excelToJson.js";
import CrearEvento from "./crearEvento.js";

/*
Autor: Germán Mansilla
*/

class CargaMasiva {
    constructor() {
        this.excelToJson = new ExcelToJson()
        this.crearEvento = new CrearEvento()
    }

    ejecutar = async ({fileName}) => {
        const eventos = this.excelToJson.convertir(fileName);

        let result = []

        for (let i = 0; i < eventos.length; i++) {
            const item = eventos[i]
            try {
                const eventoCreado = await this.crearEvento.ejecutar(item)
                result.push({codigo: item.codigo, id: eventoCreado.id, apiKey: eventoCreado.apiKey})
            }
            catch (error){
                result.push({codigo: item.codigo, error: error.message})
            }
        }

        return result
    }
}

export default CargaMasiva