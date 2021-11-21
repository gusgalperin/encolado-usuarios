import NotFoundError from "../exceptions/notFoundError.js";
import InvalidArgsError from "../exceptions/invalidArgsError.js";
import {getDao} from "../../persistencia/daoFactory.js";
/*Ruiz, Daniel */
class GenerarReporte {
    constructor() {
        this.dao = getDao()
    }

    ejecutar = async ({eventoId}) => {
        const evento = await this.buscarEvento(eventoId)

        this.validar(evento)

        const usuarios = await this.dao.usuarios.buscarTodos(eventoId)

        const reporteData = this.armarReporte(usuarios)

        return { evento: evento, reporte: reporteData }
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
                id: usuario.id,
                email: usuario.email,
                nombre: usuario.nombre,
                telefono: usuario.telefono,
                encoladoEn: this.formatearFecha(usuario.encoladoEn),
                desencoladoEn: this.formatearFecha(usuario.desencoladoEn),
                tiempoEsperaEnSegundos: this.calcularTiempoEspera (usuario.encoladoEn, usuario.desencoladoEn),
                lugarEnLaCola: usuario.lugarEnLaCola
            })
        }

        return reporte
    }

    formatearFecha = (fecha) => {
        if(!fecha)
            return ''

        const date = new Date(fecha)
        return date.toISOString().replace(/T/, ' ').replace(/\..+/, '')
    }

    calcularTiempoEspera(encoladoEn, desencoladoEn){
        if(!desencoladoEn)
            return ''

        return (new Date(desencoladoEn)-new Date(encoladoEn))/1000
    }
}

export default GenerarReporte