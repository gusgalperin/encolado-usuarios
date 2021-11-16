import NotFoundError from "../exceptions/notFoundError.js";
import InvalidArgsError from "../exceptions/invalidArgsError.js";
import {getDao} from "../../persistencia/daoFactory.js";

class GenerarReporte {
    constructor() {
        this.dao = getDao()
    }

    ejecutar = async ({eventoId}) => {
        const evento = await this.buscarEvento(eventoId)

        this.validar(evento)

        const usuarios = await this.dao.usuarios.buscarTodos(eventoId)

        const reporteData = this.armarReporte(usuarios)

        return reporteData
    }

    buscarEvento = async (eventoId) => {
        const evento = await this.dao.eventos.getById(eventoId)

        if(!evento)
            throw new NotFoundError('evento inexistente')

        return evento
    }

    validar = (evento) => {
        if (new Date(evento.fechaHoraFinEvento) > new Date())
            throw new InvalidArgsError('para descargar el reporte el evento tiene que estar finalizado')
    }

    armarReporte = (usuarios) => {
        let reporte = []

        for (let i = 0; i < usuarios.length; i++) {
            const usuario = usuarios[i]

            reporte.push({
                eventoId: usuario.eventoId,
                email: usuario.email,
                encoladoEn: usuario.encoladoEn,
                desencoladoEn: usuario.desencoladoEn,
                tiempoEsperaEnSegundos: (new Date(usuario.desencoladoEn)-new Date(usuario.encoladoEn))/1000
            })
        }

        return reporte
    }
}

export default GenerarReporte