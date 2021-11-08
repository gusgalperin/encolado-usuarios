import NumeroDuplicadoPorUsuario from "../../negocio/exceptions/numeroDuplicadoPorUsuario.js";
import BaseDaoFs from "./baseDaoFS.js";

class DaoNumerosFs extends BaseDaoFs {
    constructor (ruta){
        super(ruta)
    }

    async obtenerTodosParaEvento(eventoId){
        const numeros = await this.getAll();
        
        return numeros.filter(x => x.eventoId == eventoId)
    }

    async obtenerUltimoNumero(eventoId){
        const numeros = await this.obtenerTodosParaEvento(eventoId);

        if(numeros.length > 0){
            return numeros.sort((a, b) => parseInt(b.numero) - parseInt(a.numero))[0].numero
        }

        return 0
    }

    async buscarNumero(eventoId, usuarioId){
        const numeros = await this.obtenerTodosParaEvento(eventoId);

        return numeros.find(x => x.usuarioId == usuarioId).numero
    }

    async save(doc){
        let numeroExiste = await this.buscarNumero(doc.eventoId, doc.usuarioId)
        
        if(numeroExiste)
            throw new NumeroDuplicadoPorUsuario()

        await super.save(doc)
    }
}

export default DaoNumerosFs