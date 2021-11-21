import CustomError from "./CustomError.js";

/*
* Autor: Galperin Gustavo
*/

class NotFoundError extends CustomError{
    constructor(mensaje) {
        super(mensaje, 'NOT_FOUND');
    }
}

export default NotFoundError