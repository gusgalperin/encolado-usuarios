import DaoEventsMongodb from "./daoEventsMongodb.js"
import DaoNumerosMongodb from "./daoNumerosMongodb.js"
import DaoUsuariosMongodb from "./daoUsuariosMongodb.js"

class DaoMongodb{
    constructor(){
        this.numeros = new DaoNumerosMongodb()
        this.eventos = new DaoEventsMongodb()
        this.usuarios = new DaoUsuariosMongodb()
    }

    async crearIndices(){
        await this.numeros.crearIndices()
    }
}

export default DaoMongodb