import { getDao } from "../../persistencia/daoFactory.js";

class CalcularTiempoEspera {
    constructor() {
        this.dao = getDao()
    }

    ejecutar = async (usuario) => {
        const evento = await this.dao.eventos.getById(usuario.eventoId)
        const genteAntesQueVos = await this.dao.usuarios.getCantidadDeUsuariosPrevios(usuario.eventoId, usuario.id)
    }
}

export default  CalcularTiempoEspera