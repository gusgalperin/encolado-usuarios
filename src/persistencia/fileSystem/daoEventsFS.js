import BaseDaoFs from "./baseDaoFS.js";

class DaoEventsFs extends BaseDaoFs {
    constructor (ruta){
        super(ruta)
    }

    async getById(id){
        const events = await this.getAll()
        return events.find(x => x.id == id);
    }

    async getByApiKey(apikey){
        const events = await this.getAll()
        return events.find(x => x.apiKey == apikey);
    }
}

export default DaoEventsFs