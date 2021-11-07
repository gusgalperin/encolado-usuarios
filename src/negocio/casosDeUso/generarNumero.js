import { getDao } from "../../persistencia/daoFactory.js";
import Numero from "../entidades/numero.js";

class GenerarNumero {
    constructor(){
        this.dao = new getDao().numeros
    }

    async ejecutar({eventoId, usuarioId}){
        let numero = new Numero(eventoId, usuarioId)
        const ultimoNumero = await this.dao.obtenerUltimoNumero(eventoId)
        numero.setNumero(ultimoNumero + 1)
        await this.dao.save(numero)
    }
}

export default GenerarNumero