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
        const evento = await this.dao.eventos.getById(eventoId)

        await this.validar(evento)

        let usuario = new Usuario(eventoId, email, nombre, telefono)

        const lugarEnLaCola = await this.generarNumero.ejecutar({eventoId: eventoId, usuarioId: usuario.id})

        usuario.setLugarEnLaCola(lugarEnLaCola)

        await this.dao.usuarios.save(usuario)

        const tiempoEstimadoDeEspera = await this.calcularTiempoDeEspera.ejecutar(usuario)

        await this.enviarMail(evento, usuario, tiempoEstimadoDeEspera)

        return { usuarioId: usuario.id, tiempoEstimadoDeEsperaEnMinutos: tiempoEstimadoDeEspera }
    }

    validar = async (evento) => {
        if(!evento){
            throw new Error('no se encontro el evento ' + eventoId)
        }

        let now = new Date()

        if(new Date(evento.fechaHoraInicioEncolado) > now)
            throw new Error('aun no inicio el horario de encolado')

        if(new Date(evento.fechaHoraFinEvento) < now)
            throw new Error('el evento ya finalizo')
    }

    enviarMail = async (evento, usuario, tiempoEspera) => {
        const datos = {
            nombre: usuario.nombre,
            codigoEvento: evento.codigoEvento,
            lugarEnlaCola: usuario.lugarEnlaCola,
            tiempoEspera: tiempoEspera
        }

        const mailer = crearMailer(new EncoladoProvider(datos))

        await mailer.enviar(usuario.email)
    }
}

export default EncolarUsuario