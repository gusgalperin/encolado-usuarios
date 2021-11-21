import BaseDaoFs from "./baseDaoFS.js";
import EventoDuplicado from "../../negocio/exceptions/eventoDuplicado.js";
import NotFoundError from "../../negocio/exceptions/notFoundError.js";
import Evento from "../../negocio/entidades/evento.js";

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
        const evento = events.find(x => x.id == id);

        if(!evento)
            throw new NotFoundError('no se encontro el evento ' + id)

        return Evento.set(evento)
    }
  

    async getByApiKey(apikey){
        const events = await this.getAll()
        return events.find(x => x.apiKey == apikey);
    }
}

export default DaoEventsFs