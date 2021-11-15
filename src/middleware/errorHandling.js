import CustomError from "../negocio/exceptions/CustomError.js";
import { errorType } from "../negocio/exceptions/errorType.js";

async function errorHandling (err, req, res, next) {
    let status = 500

    if(err instanceof CustomError){
        if (err.tipo == errorType.NOT_FOUND) {
            status = 404
        } else if (err.tipo == errorType.INVALID_ARGS) {
            status = 400
        }
    }

    res.status(status)
    res.json({error: err.message})

}

export { errorHandling }