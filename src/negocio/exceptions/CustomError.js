/*
* Autor: Galperin Gustavo
*/

class CustomError extends Error {
    constructor(mensaje, tipo){
        super(mensaje)
        this.tipo = tipo
    }
}

export default  CustomError