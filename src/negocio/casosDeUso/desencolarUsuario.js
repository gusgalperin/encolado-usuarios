
// --------------Hecho por Alex Ignacio Nuñez------------------
import {getDao} from "../../persistencia/daoFactory.js";
import DesencoladoEmailData from "../../utils/moduloMail/desencoladoProvider.js";
import { crearMailer } from "../../utils/moduloMail/fabricaMails.js";
import Cola from "../colaUsuarios.js";

class DesencolarUsuario {
    constructor() {
        this.dao = getDao()
        this.mailer = crearMailer()
        this.cola = new Cola()
    }

    ejecutar =  async({eventoId}) => {
        const evento = await this.dao.eventos.getById(eventoId)

        const usuarioDesencolado = await this.cola.desencolar({evento: evento})

        await this.mailer.enviar(usuarioDesencolado.email,new DesencoladoEmailData(usuarioDesencolado) )

        return { id: usuarioDesencolado.id, email: usuarioDesencolado.email }
    }
}

export default DesencolarUsuario