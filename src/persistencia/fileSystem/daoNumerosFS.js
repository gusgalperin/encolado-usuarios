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
}

export default DaoNumerosFs