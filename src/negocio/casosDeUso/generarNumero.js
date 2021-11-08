import { getDao } from "../../persistencia/daoFactory.js";
import Numero from "../entidades/numero.js";
import NumeroDuplicadoPorNumero from "../exceptions/numeroDuplicadoPorNumero.js";
import NumeroDuplicadoPorUsuario from "../exceptions/numeroDuplicadoPorUsuario.js";

class GenerarNumero {
    constructor(){
        this.dao = new getDao().numeros
    }

    ejecutar = async ({eventoId, usuarioId}) => {
        let numero

        try {
            numero = await this.generarNumero(eventoId, usuarioId)
        } catch (error) {
            if(error instanceof NumeroDuplicadoPorUsuario){
                //ya hay un numero para mismo evento, mismo usuario, se devuelve numero original
                return await this.dao.buscarNumero(eventoId, usuarioId)
            }
            else if(error instanceof NumeroDuplicadoPorNumero){
                //duplicado por concurrencia --> se reintenta
                //TODO: agregar max reintentos
                numero = await this.generarNumero(eventoId, usuarioId)
            }
        }

        return numero
    }

    generarNumero = async (eventoId, usuarioId) => {
        let numero = new Numero(eventoId, usuarioId)
        const ultimoNumero = await this.dao.obtenerUltimoNumero(eventoId)

        let siguienteNumero = ultimoNumero + 1

        numero.setNumero(siguienteNumero)

        await this.dao.save(numero)

        return siguienteNumero
        
    }
}

export default GenerarNumero