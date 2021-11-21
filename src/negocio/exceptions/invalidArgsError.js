import CustomError from "./CustomError.js";

/*
* Autor: Galperin Gustavo
*/

class InvalidArgsError extends CustomError{
    constructor(mensaje) {
        super(mensaje, 'INVALID_ARGS');
    }
}

export default InvalidArgsError