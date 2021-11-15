import CustomError from "./CustomError.js";

class InvalidArgsError extends CustomError{
    constructor(mensaje) {
        super(mensaje, 'INVALID_ARGS');
    }
}

export default InvalidArgsError