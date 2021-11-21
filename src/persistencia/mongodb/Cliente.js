import { MongoClient } from "mongodb"
import { MONGO_URI } from '../../config.js'

/*
* Autor: Galperin Gustavo
*/

class ClientePrivado{
    constructor(){
        this.mongoClient = new MongoClient(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    }

    database(dbName){
        return this.mongoClient.db(dbName)
    }

    async conectar(){
        await this.mongoClient.connect()
    }

    async desconectar(){
        await this.mongoClient.close()
    }
}

class Cliente{

    constructor(){ }

    static getCliente(){

        if (!Cliente.instance){
            Cliente.instance = new ClientePrivado()
        }

        return Cliente.instance;
    }
}

export default Cliente