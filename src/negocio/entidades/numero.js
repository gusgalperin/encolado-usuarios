class Numero {
    constructor(eventoId, usuarioId){
        this.eventoId = eventoId
        this.usuarioId = usuarioId
        this.creadoEn = new Date()
        this.numero = 0
    }

    setNumero(numero){
        this.numero = numero;
    }
}

export default Numero