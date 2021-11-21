import { getDao } from "../../persistencia/daoFactory.js";
import { crearMailer } from '../../utils/moduloMail/fabricaMails.js'
import EncoladoEmailData from "../../utils/moduloMail/encoladoEmailData.js";
import Cola from "../colaUsuarios.js";

/*
* Autor: Galperin Gustavo
*/

class EncolarUsuario {
    constructor(){
        this.dao = getDao()
        this.mailer = crearMailer()
        this.cola = new Cola()
    }

    ejecutar = async ({eventoId, email, nombre, telefono}) => {
        const evento = await this.dao.eventos.getById(eventoId)

        const usuarioEncolado = await this.cola.encolar({evento: evento, email: email, nombre: nombre, telefono: telefono})

        await this.enviarMail(evento, usuarioEncolado.usuario, usuarioEncolado.tiempoEspera)

        return { usuarioId: usuarioEncolado.usuario.id, tiempoEstimadoDeEsperaEnMinutos: usuarioEncolado.tiempoEspera }
    }

    enviarMail = async (evento, usuario, tiempoEspera) => {
        const datos = {
            nombre: usuario.nombre,
            codigoEvento: evento.codigoEvento,
            lugarEnlaCola: usuario.lugarEnLaCola,
            tiempoEspera: tiempoEspera
        }

        await this.mailer.enviar(usuario.email, new EncoladoEmailData(datos))
    }
}

export default EncolarUsuario