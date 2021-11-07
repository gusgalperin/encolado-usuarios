import BaseDaoMongodb from "./baseDaoMongodb.js";

class DaoNumerosMongodb extends BaseDaoMongodb{

    constructor(){
        super('numeros')
    }

    async obtenerTodosParaEvento(eventoId){
        const query = { eventoId: eventoId }

        return await this.collection.find(query).toArray()
    }

    async obtenerUltimoNumero(eventoId){
        const query = { eventoId: eventoId }
        const options = { 
            sort: {numero:-1},
            limit: 1
        }

        const ultimoNumero = await this.collection.find(query, options).toArray()

        if(ultimoNumero.length > 0){
            return ultimoNumero[0].numero
        }

        return 0
    }

}

export default DaoNumerosMongodb