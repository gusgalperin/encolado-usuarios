import InvalidArgsError from "./invalidArgsError.js";

/*
* Autor: Galperin Gustavo
*/

class EventoDuplicado extends InvalidArgsError {
    constructor(codigo) {
        super(`el evento con codigo ${codigo} ya existe`);
    }
}
export default EventoDuplicado