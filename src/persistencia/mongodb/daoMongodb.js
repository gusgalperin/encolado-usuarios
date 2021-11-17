import DaoEventsMongodb from "./daoEventsMongodb.js"
import DaoUsuariosMongodb from "./daoUsuariosMongodb.js"

/*
* Autor: Galperin Gustavo
*/

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