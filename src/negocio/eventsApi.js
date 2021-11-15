import { getDao } from '../persistencia/daoFactory.js'

const dao = getDao().eventos;

class EventsApi{
    constructor() {}

    async buscarPorId(id){
        let evento = await dao.getById(id);
        if(evento)
            delete evento.apiKey
        return evento
    }

    async buscarPorApiKey(apikey){
        return await dao.getByApiKey(apikey);
    }

    async buscarTodo(){
        return await dao.getAll();
    }
}

export default EventsApi