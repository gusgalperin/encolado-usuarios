import Mailer from '../moduloMail/enviarMail.js'
import { FAKE_MAIL } from "../../config.js";
import MailerMock from "./enviarMailMock.js";

function crearMailer(subjectAndBodyProvider) {
    if(FAKE_MAIL)
        return new MailerMock()
    else
        return new Mailer(subjectAndBodyProvider)
}


export { crearMailer }