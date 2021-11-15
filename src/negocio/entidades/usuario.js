import { v4 as uuidv4 } from 'uuid'
import EmailValidator from 'email-validator'
import InvalidArgsError from "../exceptions/invalidArgsError.js";

class Usuario {
    constructor(eventoId, email, nombre, telefono){
        this.eventoId = eventoId

        this.setEmail(email)
        this.setNombre(nombre)
        this.setTelefono(telefono)

        this.id = uuidv4();
        this.encoladoEn = new Date()
        this.estado = 'encolado' //  [encolado, desencolado, eliminado]
        this.desencoladoEn = null
    }

    setEmail(email){
        if(!EmailValidator.validate(email))
            throw new InvalidArgsError('email invalido')

        this.email = email
    }

    setNombre(nombre){
        if(!nombre)
            throw new InvalidArgsError('nombre invalido')

        this.nombre = nombre
    }

    setTelefono(telefono){
        if(!telefono)
            throw new InvalidArgsError('telefono invalido')

        this.telefono = telefono
    }

    setLugarEnLaCola(numero){
        this.lugarEnLaCola = numero
    }
}

export default Usuario