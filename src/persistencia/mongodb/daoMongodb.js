import DaoEventsMongodb from "./daoEventsMongodb.js"
import DaoUsuariosMongodb from "./daoUsuariosMongodb.js"

class DaoMongodb{
    constructor(){
        this.eventos = new DaoEventsMongodb()
        this.usuarios = new DaoUsuariosMongodb()
    }

    async crearIndices(){
        await this.usuarios.crearIndices()
    }
}

export default DaoMongodb