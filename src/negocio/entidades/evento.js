import { v4 as uuidv4 } from 'uuid'
import { generateApiKey } from '../../security/apiKeyGenerator.js'

class Evento{
    constructor(codigo, descripcion, fechaHoraInicioEvento, fechaHoraFinEvento, fechaHoraInicioEncolado, tiempoEstimadoAtencionPorUsuarioEnMinutos, usuariosRecurrentes) {
        this.codigo = codigo
        this.descripcion = descripcion
        this.tiempoEstimadoAtencionPorUsuarioEnMinutos = tiempoEstimadoAtencionPorUsuarioEnMinutos
        this.usuariosRecurrentes = usuariosRecurrentes

        this.setFechas(
            this.validarFecha(fechaHoraInicioEvento),
            this.validarFecha(fechaHoraFinEvento),
            this.validarFecha(fechaHoraInicioEncolado)
        )

        this.id = uuidv4();
        this.apiKey = generateApiKey(`${this.id}|${this.codigo}`)
    }

    validarFecha = (fecha) => {
        try{
            return new Date(fecha)
        }
        catch (error){
            throw new Error('fecha incorrecta ' + fecha)
        }
    }

    // || ------> encolado -----> inicio ------> fin ------> ||
    setFechas = (fechaInicioEvento, fechaFinEvento, fechaInicioEncolado) => {
        if(fechaInicioEvento >= fechaFinEvento){
            throw new Error('la fecha de inicio de evento debe ser inferior a la fecha de fin de evento')
        }

        if(fechaInicioEncolado >= fechaInicioEvento || fechaInicioEncolado >= fechaFinEvento){
            throw new Error('fecha inicio encolado incorrecta')
        }

        this.fechaHoraInicioEvento = fechaInicioEvento
        this.fechaHoraInicioEncolado = fechaInicioEncolado
        this.fechaHoraFinEvento = fechaFinEvento
    }

}

export default Evento