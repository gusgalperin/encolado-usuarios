import CustomError from "./CustomError.js";

class InvalidArgsErrorError extends CustomError{
    constructor(mensaje) {
        super(mensaje, 'INVALID_ARGS');
    }
}

export default InvalidArgsErrorError