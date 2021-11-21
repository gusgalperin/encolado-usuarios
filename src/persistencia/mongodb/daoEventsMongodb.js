import BaseDaoMongodb from "./baseDaoMongodb.js";
import EventoDuplicado from "../../negocio/exceptions/eventoDuplicado.js";
import NotFoundError from "../../negocio/exceptions/notFoundError.js";
import Evento from "../../negocio/entidades/evento.js"

/*
* Autor: Galperin Gustavo
*/

class DaoEventsMongodb extends BaseDaoMongodb{

    constructor(){
        super('eventos')

        this.UNIQUE_EVENTO = 'ix_codigo'
    }

    crearIndices = async () => {
        await this.collection.createIndex(
            { codigo: 1 },
            { unique: true, name: this.UNIQUE_EVENTO });
    }

    save = async (doc) => {
        try {
            await super.save(doc)
        } catch (error) {
            if(error.code == 11000){
                if(error.message.includes(this.UNIQUE_EVENTO)){
                    throw new EventoDuplicado(doc.codigo)
                }
            }

            //unexpected error
            throw error
        }
    }

    async getById(id){
        const query = {id: id}
        const eventoFromDb =  await this.collection.findOne(query)

        if(!eventoFromDb)
            throw new NotFoundError('no se encontro el evento ' + id)

        return Evento.set(eventoFromDb)
    }

    async getByApiKey(apikey){
        const query = {apiKey: apikey}
        return await this.collection.findOne(query)
    }
}

export default DaoEventsMongodb