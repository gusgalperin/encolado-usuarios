import DaoEventsFs from './daoEventsFS.js'
import { DB_PATH } from '../../config.js'

class DaoFS{
    constructor(){
        this.eventos = new DaoEventsFs(`${DB_PATH}/db_eventos.json`)
    }
}

export default DaoFS