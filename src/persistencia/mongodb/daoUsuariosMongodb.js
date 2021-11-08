import BaseDaoMongodb from "./baseDaoMongodb.js"

class DaoUsuariosMongodb extends BaseDaoMongodb{
    constructor(){
        super('usuarios')
    }
}

export default DaoUsuariosMongodb