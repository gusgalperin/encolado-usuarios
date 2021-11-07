import { v4 as uuidv4 } from 'uuid'
import { generateApiKey } from '../../security/apiKeyGenerator.js'

class Evento{
    constructor(codigo, descripcion, fechaHoraInicioEvento, fechaHoraFinEvento, fechaHoraInicioEncolado, tiempoEstimadoAtencionPorUsuarioEnMinutos, usuariosRecurrentes) {
        this.codigo = codigo
        this.descripcion = descripcion
        this.fechaHoraInicioEvento = fechaHoraInicioEvento
        this.fechaHoraFinEvento = fechaHoraFinEvento
        this.fechaHoraInicioEncolado = fechaHoraInicioEncolado
        this.tiempoEstimadoAtencionPorUsuarioEnMinutos = tiempoEstimadoAtencionPorUsuarioEnMinutos
        this.usuariosRecurrentes = usuariosRecurrentes

        this.id = uuidv4();
        this.apiKey = generateApiKey(`${this.id}|${this.codigo}`)
    }
}

export default Evento