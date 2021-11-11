import Mailer from '../moduloMail/enviarMail.js'

function crearMailer(subjectAndBodyProvider) {
    return new Mailer(subjectAndBodyProvider)
}


export { crearMailer }