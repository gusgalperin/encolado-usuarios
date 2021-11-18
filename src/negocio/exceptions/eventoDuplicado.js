import InvalidArgsError from "./invalidArgsError.js";
class EventoDuplicado extends InvalidArgsError {
    constructor(codigo) {
        super(`el evento con codigo ${codigo} ya existe`);
    }
}
export default EventoDuplicado