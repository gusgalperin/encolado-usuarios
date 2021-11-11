import BaseDaoMongodb from "./baseDaoMongodb.js"

class DaoUsuariosMongodb extends BaseDaoMongodb{
    constructor(){
        super('usuarios')
    }

    getCantidadDeUsuariosPrevios = async(eventoId, usuarioId, lugarEnlaCola) => {
        const query = {
            eventoId: eventoId,
            estado: 'encolado',
            lugarEnlaCola : { $lt:lugarEnlaCola }
        }

        return await this.collection.find(query).count()
    }
}

export default DaoUsuariosMongodb