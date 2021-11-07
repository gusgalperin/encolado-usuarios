import { USE_MONGO } from '../config.js'
import DaoFS from "./fileSystem/daoFS.js";
import DaoMongodb from "./mongodb/daoMongodb.js";


function getDao() {
    if(USE_MONGO){
        return new DaoMongodb();
    }
    else{
        return new DaoFS();
    }
}

export { getDao }
