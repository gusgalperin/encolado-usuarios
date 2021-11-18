import BaseDaoFs from "./baseDaoFS.js";
import EventoDuplicado from "../../negocio/exceptions/eventoDuplicado.js";

class DaoEventsFs extends BaseDaoFs {
    constructor (ruta){
        super(ruta)
    }

    async save(doc){
        const eventos = await this.getAll()

        const eventoExiste = eventos
            .filter(u => u.codigo == doc.codigo)

        if(eventoExiste.length > 0)
            throw new EventoDuplicado(doc.codigo)

        await super.save(doc)
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