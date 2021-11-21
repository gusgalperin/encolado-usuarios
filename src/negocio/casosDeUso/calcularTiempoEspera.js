import { getDao } from "../../persistencia/daoFactory.js";

/*
* Autor: Galperin Gustavo
*/

class CalcularTiempoEspera {
    constructor() {
        this.dao = getDao()
    }

    ejecutar = async (usuario) => {
        const evento = await this.dao.eventos.getById(usuario.eventoId)
        const cantidadGenteAntesQueVos = await this.dao.usuarios.getCantidadDeUsuariosPrevios(usuario.eventoId, usuario.id, usuario.lugarEnLaCola)

        return (parseInt(cantidadGenteAntesQueVos) / parseInt(evento.usuariosConcurrentes)) * parseInt(evento.tiempoEstimadoAtencionPorUsuarioEnMinutos)
    }
}

export default  CalcularTiempoEspera