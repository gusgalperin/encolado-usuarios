import NumeroDuplicadoPorUsuario from "../../negocio/exceptions/numeroDuplicadoPorUsuario.js";
import NumeroDuplicadoPorNumero from "../../negocio/exceptions/numeroDuplicadoPorNumero.js";
import BaseDaoMongodb from "./baseDaoMongodb.js";

class DaoNumerosMongodb extends BaseDaoMongodb{
    constructor(){
        super('numeros')
        this.UNIQUE_EVENTO_USUARIO = 'ix_evento_usuario'
        this.UNIQUE_EVENTO_NUMERO = 'ix_evento_numero'
    }

    async crearIndices(){
        await this.collection.createIndex({ eventoId: 1, usuarioId: 1 }, { unique: true, name: this.UNIQUE_EVENTO_USUARIO});
        await this.collection.createIndex({ eventoId: 1, numero: 1 }, { unique: true, name: this.UNIQUE_EVENTO_NUMERO });
    }

    async save(doc){
        try {
            await super.save(doc)
        } catch (error) {
            if(error.code == 11000){
                if(error.message.includes(this.UNIQUE_EVENTO_NUMERO)){
                    throw new NumeroDuplicadoPorNumero()
                }
                else if(error.message.includes(this.UNIQUE_EVENTO_USUARIO)){
                    throw new NumeroDuplicadoPorUsuario()
                }
            }

            //unexpected error
            throw error
        }
    }

    async obtenerTodosParaEvento(eventoId){
        const query = { eventoId: eventoId }
        const options = {sort:{numero:1}}

        return await this.collection.find(query, options).toArray()
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

    async buscarNumero(eventoId, usuarioId){
        const query = { eventoId: eventoId, usuarioId: usuarioId }

        let numero = await this.collection.findOne(query)

        if(!numero)
            throw new Error('numero no encontrado')

        return numero.numero
    }

}

export default DaoNumerosMongodb