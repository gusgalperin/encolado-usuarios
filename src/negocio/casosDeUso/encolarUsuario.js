import { getDao } from "../../persistencia/daoFactory.js";
import Usuario from "../entidades/usuario.js";
import GenerarNumero from "./generarNumero.js";
import CalcularTiempoEspera from "./calcularTiempoEspera.js";
import { crearMailer } from '../../utils/moduloMail/fabricaMails.js'
import EncoladoProvider from "../../utils/moduloMail/encoladoProvider.js";

class EncolarUsuario {
    constructor(){
        this.generarNumero = new GenerarNumero()
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
            throw new Error('no se encontro el evento ' + eventoId)
        }
        return evento
    }

    validar = async (evento) => {

        let now = new Date()

        if(new Date(evento.fechaHoraInicioEncolado) > now)
            throw new Error('aun no inicio el horario de encolado')

        if(new Date(evento.fechaHoraFinEvento) < now)
            throw new Error('el evento ya finalizo')
    }

    crearUsuario = async (eventoId, email, nombre, telefono) => {
        let usuario = new Usuario(eventoId, email, nombre, telefono)

        const lugarEnLaCola = await this.generarNumero.ejecutar({eventoId: eventoId, usuarioId: usuario.id})

        usuario.setLugarEnLaCola(lugarEnLaCola)

        await this.dao.usuarios.save(usuario)

        return usuario
    }

    enviarMail = async (evento, usuario, tiempoEspera) => {
        const datos = {
            nombre: usuario.nombre,
            codigoEvento: evento.codigoEvento,
            lugarEnlaCola: usuario.lugarEnlaCola,
            tiempoEspera: tiempoEspera
        }

        await this.mailer.enviar(usuario.email, new EncoladoProvider(datos))
    }
}

export default EncolarUsuario