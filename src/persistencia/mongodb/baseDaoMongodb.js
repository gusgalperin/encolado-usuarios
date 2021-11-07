import {MONGO_DB_NAME} from '../../config.js'
import Cliente from './Cliente.js'

class BaseDaoMongodb {
    constructor (collectionName){
        const clienteMongo = Cliente.getCliente()

        this.database = clienteMongo.database(MONGO_DB_NAME);
        this.collection = this.database.collection(collectionName);
    }
    
    async save(doc){
        const result = await this.collection.insertOne(doc);
    }

    async deleteAll(){
        await this.collection.deleteMany()
    }
}

export default BaseDaoMongodb