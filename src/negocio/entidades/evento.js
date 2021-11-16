import { v4 as uuidv4 } from 'uuid'
import { generateApiKey } from '../../security/apiKeyGenerator.js'
import InvalidArgsError from '../exceptions/invalidArgsError.js'

class Evento{
    constructor(codigo, descripcion, fechaHoraInicioEvento, fechaHoraFinEvento, fechaHoraInicioEncolado, tiempoEstimadoAtencionPorUsuarioEnMinutos, usuariosConcurrentes) {
        this.DEFAULT_TIEMPO_ATENCION = 10
        this.DEFAULT_USUARIOS_CONCURRENTES = 1

        this.setCodigo(codigo)
        this.setDescripcion(descripcion)

        this.setTiempoEstimadoAtencionPorUsuarioEnMinutos(tiempoEstimadoAtencionPorUsuarioEnMinutos)
        this.setusuariosConcurrentes(usuariosConcurrentes)

        this.setFechas(
            this.validarFecha(fechaHoraInicioEvento),
            this.validarFecha(fechaHoraFinEvento),
            this.validarFecha(fechaHoraInicioEncolado)
        )

        this.id = uuidv4();
        this.apiKey = generateApiKey(`${this.id}|${this.codigo}`)
    }

    setCodigo = (codigo) => {
        if(!codigo)
            throw new InvalidArgsError('codigo invalido')

        this.codigo = codigo
    }

    setDescripcion = (descripcion) => {
        if(!descripcion)
            throw new InvalidArgsError('descripcion invalida')

        this.descripcion = descripcion
    }

    setTiempoEstimadoAtencionPorUsuarioEnMinutos = (tiempoEstimadoAtencionPorUsuarioEnMinutos) => {
        if(!tiempoEstimadoAtencionPorUsuarioEnMinutos){
            tiempoEstimadoAtencionPorUsuarioEnMinutos = this.DEFAULT_TIEMPO_ATENCION
        }

        this.tiempoEstimadoAtencionPorUsuarioEnMinutos = tiempoEstimadoAtencionPorUsuarioEnMinutos
    }

    setusuariosConcurrentes = (usuariosConcurrentes) => {
        if(!usuariosConcurrentes){
            usuariosConcurrentes = this.DEFAULT_USUARIOS_CONCURRENTES
        }

        this.usuariosConcurrentes = usuariosConcurrentes
    }

    validarFecha = (fecha) => {
        try{
            return new Date(fecha)
        }
        catch (error){
            throw new InvalidArgsError('fecha incorrecta ' + fecha)
        }
    }

    // || ------> encolado -----> inicio ------> fin ------> ||
    setFechas = (fechaInicioEvento, fechaFinEvento, fechaInicioEncolado) => {
        if(fechaInicioEvento >= fechaFinEvento){
            throw new InvalidArgsError('la fecha de inicio de evento debe ser inferior a la fecha de fin de evento')
        }

        if(fechaInicioEncolado >= fechaInicioEvento || fechaInicioEncolado >= fechaFinEvento){
            throw new InvalidArgsError('fecha inicio encolado incorrecta')
        }

        this.fechaHoraInicioEvento = fechaInicioEvento
        this.fechaHoraInicioEncolado = fechaInicioEncolado
        this.fechaHoraFinEvento = fechaFinEvento
    }

}

export default Evento