import {getDao} from "../../persistencia/daoFactory.js";
import NotFoundError from "../exceptions/notFoundError.js";
import InvalidArgsError from "../exceptions/invalidArgsError.js";
import Usuario from '../entidades/usuario.js'

class DesencolarUsuario {
    constructor() {
        this.dao = getDao()
    }

    ejecutar =  async ({eventoId}) => {
        const evento = await this.buscarEvento(eventoId)

        this.validar(evento)

        let usuarioFromDb = await this.dao.usuarios.buscarPrimeroEnLaCola(eventoId)

        if(!usuarioFromDb)
            throw new NotFoundError('no hay usuarios para desencolar')

        let usuario = Usuario.set(usuarioFromDb)

        usuario.desencolar()

        await this.dao.usuarios.update(usuario)

        //TODO enviar mail

        return { id: usuario.id, email: usuario.email }
    }

    buscarEvento = async (eventoId) => {
        const evento = await this.dao.eventos.getById(eventoId)

        if(!evento)
            throw new NotFoundError('evento inexistente')

        return evento
    }

    validar = (evento) => {
        const ahora = new Date()

        if(evento.fechaHoraInicioEvento > ahora)
            throw new InvalidArgsError('se puede desencolar a partir de la fecha ' + evento.fechaHoraInicioEvento )

        if(evento.fechaHoraFinEvento < ahora)
            throw new InvalidArgsError('el evento ya finalizo')
    }
}

export default DesencolarUsuario