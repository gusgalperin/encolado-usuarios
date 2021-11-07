import BaseDaoMongodb from "./baseDaoMongodb.js";

class DaoEventsMongodb extends BaseDaoMongodb{

    constructor(){
        super('eventos')
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