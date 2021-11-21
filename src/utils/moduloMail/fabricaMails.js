import Mailer from '../moduloMail/enviarMail.js'
import { FAKE_MAIL } from "../../config.js";
import MailerMock from "./enviarMailMock.js";

// --------------Hecho por Alex Ignacio Nuñez------------------


function crearMailer(forzarReal) {
    if(FAKE_MAIL && !forzarReal)
        return new MailerMock()
    else
        return new Mailer()
}

export { crearMailer }

