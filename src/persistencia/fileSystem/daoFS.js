import DaoEventsFs from './daoEventsFS.js'
import { DB_PATH } from '../../config.js'
import DaoNumerosFs from './daoNumerosFS.js'

class DaoFS{
    constructor(){
        this.eventos = new DaoEventsFs(`${DB_PATH}/db_eventos.json`)
        this.numeros = new DaoNumerosFs(`${DB_PATH}/db_numeros.json`)
    }
}

export default DaoFS