import { getDao } from "../../persistencia/daoFactory.js";
import Usuario from "../entidades/usuario.js";
import CalcularTiempoEspera from "./calcularTiempoEspera.js";
import { crearMailer } from '../../utils/moduloMail/fabricaMails.js'
import EncoladoProvider from "../../utils/moduloMail/encoladoProvider.js";
import NotFoundError from "../exceptions/notFoundError.js"
import InvalidArgsErrorError from "../exceptions/invalidArgsError.js";
import NumeroDuplicadoPorUsuario from "../exceptions/numeroDuplicadoPorUsuario.js";
import NumeroDuplicadoPorNumero from "../exceptions/numeroDuplicadoPorNumero.js";

class EncolarUsuario {
    constructor(){
        this.calcularTiempoDeEspera = new CalcularTiempoEspera()
        this.dao = getDao()
        this.mailer = crearMailer()
    }

    ejecutar = async ({eventoId, email, nombre, telefono}) => {
        const evento = await this.buscarEvento(eventoId)

        await this.validar(evento)

        const usuario = await this.crearUsuario(eventoId, email, nombre, telefono)

        const tiempoEstimadoDeEspera = await this.calcularTiempoDeEspera.ejecutar(usuario)

        await this.enviarMail(evento, usuario, tiempoEstimadoDeEspera)

        return { usuarioId: usuario.id, tiempoEstimadoDeEsperaEnMinutos: tiempoEstimadoDeEspera }
    }

    buscarEvento = async (eventoId) => {
        const evento = await this.dao.eventos.getById(eventoId)
        if(!evento){
            throw new NotFoundError('no se encontro el evento ' + eventoId)
        }
        return evento
    }

    validar = async (evento) => {

        let now = new Date()

        if(new Date(evento.fechaHoraInicioEncolado) > now)
            throw new InvalidArgsErrorError('aun no inicio el horario de encolado')

        if(new Date(evento.fechaHoraFinEvento) < now)
            throw new InvalidArgsErrorError('el evento ya finalizo')
    }

    crearUsuario = async (eventoId, email, nombre, telefono) => {
        let usuario = new Usuario(eventoId, email, nombre, telefono)

        return await this.buscarNumeroYGuardar(usuario)
    }

    buscarNumeroYGuardar = async (usuario) => {
        const ultimoNumero = await this.dao.usuarios.obtenerUltimoNumero(usuario.eventoId)
        const siguienteNumero = ultimoNumero + 1

        usuario.setLugarEnLaCola(siguienteNumero)

        return await this.guardarUsuario(usuario)
    }

    guardarUsuario = async (usuario) => {
        try {
            await this.dao.usuarios.save(usuario)
            return usuario
        }
        catch(error){
            if(error instanceof NumeroDuplicadoPorUsuario){
                //ya hay encolado un mail para el evento, se devuelve usuario original
                return await this.dao.usuarios.getOne(usuario.eventoId, usuario.email, 'encolado')
            }
            else if(error instanceof NumeroDuplicadoPorNumero){
                //duplicado por concurrencia --> se reintenta
                //TODO: agregar max reintentos
                return await this.buscarNumeroYGuardar(usuario)
            }
        }
    }

    enviarMail = async (evento, usuario, tiempoEspera) => {
        const datos = {
            nombre: usuario.nombre,
            codigoEvento: evento.codigoEvento,
            lugarEnlaCola: usuario.lugarEnLaCola,
            tiempoEspera: tiempoEspera
        }

        await this.mailer.enviar(usuario.email, new EncoladoProvider(datos))
    }
}

export default EncolarUsuario