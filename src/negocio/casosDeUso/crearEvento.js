import { getDao } from '../../persistencia/daoFactory.js'
import Evento from '../entidades/evento.js';

/*
* Autor: Galperin Gustavo
*/

class CrearEvento {
    constructor(){
        this.dao = getDao().eventos;
    }

    async ejecutar({codigo, descripcion, fechaHoraInicioEvento, fechaHoraFinEvento, fechaHoraInicioEncolado, tiempoEstimadoAtencionPorUsuarioEnMinutos, usuariosConcurrentes}){
        const evento = new Evento(
            codigo, 
            descripcion, 
            fechaHoraInicioEvento, 
            fechaHoraFinEvento, 
            fechaHoraInicioEncolado,
            tiempoEstimadoAtencionPorUsuarioEnMinutos,
            usuariosConcurrentes)
        
        await this.dao.save(evento);
        
        return {id: evento.id, apiKey: evento.apiKey};
    }
}

export default CrearEvento