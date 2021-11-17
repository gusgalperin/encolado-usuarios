import BaseDaoMongodb from "./baseDaoMongodb.js"
import NumeroDuplicadoPorNumero from "../../negocio/exceptions/numeroDuplicadoPorNumero.js";
import NumeroDuplicadoPorUsuario from "../../negocio/exceptions/numeroDuplicadoPorUsuario.js";

/*
* Autor: Galperin Gustavo
*/

class DaoUsuariosMongodb extends BaseDaoMongodb{
    constructor(){
        super('usuarios')
        this.UNIQUE_EVENTO_USUARIO = 'ix_evento_usuario'
        this.UNIQUE_EVENTO_NUMERO = 'ix_evento_numero'
    }

    crearIndices = async () => {
        await this.collection.createIndex(
            { eventoId: 1, email: 1 },
            {unique: true, name: this.UNIQUE_EVENTO_USUARIO, partialFilterExpression: { estado: 'encolado' }});

        await this.collection.createIndex(
            { eventoId: 1, lugarEnLaCola: 1 },
            { unique: true, name: this.UNIQUE_EVENTO_NUMERO });
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

    getCantidadDeUsuariosPrevios = async(eventoId, usuarioId, lugarEnLaCola) => {
        const query = {
            eventoId: eventoId,
            estado: 'encolado',
            lugarEnLaCola : { $lt:lugarEnLaCola }
        }

        return await this.collection.find(query).count()
    }

    async obtenerUltimoNumero(eventoId){
        const query = { eventoId: eventoId }
        const options = {
            sort: { lugarEnLaCola: -1 },
            limit: 1
        }

        const ultimoNumero = await this.collection.find(query, options).toArray()

        if(ultimoNumero.length > 0){
            return ultimoNumero[0].lugarEnLaCola
        }

        return 0
    }

    getOne = async (eventoId, email, estado) => {
        const query = {
            eventoId: eventoId,
            email: email,
            estado: estado
        }

        return await this.collection.findOne(query)
    }
}

export default DaoUsuariosMongodb