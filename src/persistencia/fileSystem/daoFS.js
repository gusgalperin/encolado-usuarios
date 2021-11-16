import DaoEventsFs from './daoEventsFS.js'
import { DB_PATH } from '../../config.js'
import DaoUsuariosFS from "./daoUsuariosFS.js";

class DaoFS{
    constructor(){
        this.eventos = new DaoEventsFs(`${DB_PATH}/db_eventos.json`)
        this.usuarios = new DaoUsuariosFS(`${DB_PATH}/db_usuarios.json`)
    }
}

export default DaoFS