import CustomError from "./CustomError.js";

class NotFoundError extends CustomError{
    constructor(mensaje) {
        super(mensaje, 'NOT_FOUND');
    }
}

export default NotFoundError