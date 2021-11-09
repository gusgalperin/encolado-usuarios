import { getDao } from "../../persistencia/daoFactory.js";
import Usuario from "../entidades/usuario.js";
import GenerarNumero from "./generarNumero.js";

class EncolarUsuario {
    constructor(){
        this.generarNumero = new GenerarNumero()
        this.dao = getDao()
    }

    ejecutar = async ({eventoId, email, nombre, telefono}) => {
        await this.validar(eventoId)

        let usuario = new Usuario(eventoId, email, nombre, telefono)

        const lugarEnLaCola = await this.generarNumero.ejecutar({eventoId: eventoId, usuarioId: usuario.id})

        usuario.setLugarEnLaCola(lugarEnLaCola)

        await this.dao.usuarios.save(usuario)

        //TODO: enviar mail

        return {usuarioId: usuario.id}
    }

    validar = async (eventoId) => {
        let evento = await this.dao.eventos.getById(eventoId)

        if(!evento){
            throw new Error('no se encontro el evento ' + eventoId)
        }

        let now = new Date()

        if(new Date(evento.fechaHoraInicioEncolado) > now)
            throw new Error('aun no inicio el horario de encolado')

        if(new Date(evento.fechaHoraFinEvento) < now)
            throw new Error('el evento ya finalizo')
    }
}

export default EncolarUsuario