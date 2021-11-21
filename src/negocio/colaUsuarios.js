import {getDao} from "../persistencia/daoFactory.js";
import NumeroDuplicadoPorUsuario from "./exceptions/numeroDuplicadoPorUsuario.js";
import NumeroDuplicadoPorNumero from "./exceptions/numeroDuplicadoPorNumero.js";
import Usuario from "./entidades/usuario.js";
import CalcularTiempoEspera from "./casosDeUso/calcularTiempoEspera.js";
import NotFoundError from "./exceptions/notFoundError.js";


export default class Cola {
    constructor() {
        this.colaUsuarios = new ColaUsuarios()
    }

    encolar = async ({evento, email, nombre, telefono}) => {
        return await this.colaUsuarios.encolar({evento: evento, email: email, nombre: nombre, telefono: telefono})
    }

    desencolar = async ({evento}) => {
        return await this.colaUsuarios.desencolar({evento: evento})
    }
}

class ColaUsuarios {
    constructor() {
        this.dao = getDao()
        this.calcularTiempoEspera = new CalcularTiempoEspera()
    }

    encolar = async ({evento, email, nombre, telefono}) => {
        evento.validarEncolar()

        let usuario = new Usuario(evento.id, email, nombre, telefono)

        usuario = await this.buscarNumeroYGuardar(usuario)

        const tiempoEspera = await this.calcularTiempoEspera.ejecutar(usuario)

        return {usuario: usuario, tiempoEspera: tiempoEspera}
    }

    desencolar = async ({evento}) => {
        evento.validarDesencolar()

        let usuarioFromDb = await this.dao.usuarios.buscarPrimeroEnLaCola(evento.id)

        if(!usuarioFromDb)
            throw new NotFoundError('no hay usuarios para desencolar')

        let usuario = Usuario.set(usuarioFromDb)

        usuario.desencolar()

        await this.dao.usuarios.update(usuario)

        return usuario
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
}