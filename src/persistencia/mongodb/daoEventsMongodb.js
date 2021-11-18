import BaseDaoMongodb from "./baseDaoMongodb.js";

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

    async getById(id){
        const query = {id: id}
        return await this.collection.findOne(query)
    }

    async getByApiKey(apikey){
        const query = {apiKey: apikey}
        return await this.collection.findOne(query)
    }
}

export default DaoEventsMongodb