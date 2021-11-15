import { v4 as uuidv4 } from 'uuid'

class Usuario {
    constructor(eventoId, email, nombre, telefono){
        this.eventoId = eventoId
        this.email = email
        this.nombre = nombre
        this.telefono = telefono

        this.id = uuidv4();
        this.encoladoEn = new Date()
        this.estado = 'encolado' //  [encolado, desencolado, eliminado]
        this.desencoladoEn = null
    }

    setLugarEnLaCola(numero){
        this.lugarEnLaCola = numero
    }
}

export default Usuario