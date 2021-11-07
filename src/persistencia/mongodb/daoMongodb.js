import DaoEventsMongodb from "./daoEventsMongodb.js"
import DaoNumerosMongodb from "./daoNumerosMongodb.js"

class DaoMongodb{
    constructor(){
        this.numeros = new DaoNumerosMongodb()
        this.eventos = new DaoEventsMongodb()
    }
}

export default DaoMongodb