import { USER, PASS } from '../../config.js'
import nodemailer from 'nodemailer'

// --------------Hecho por Alex Ignacio Nuñez------------------


class Mailer {
    constructor(){
        this.transporter = nodemailer.createTransport({
            host: "smtp-mail.outlook.com", // hostname
            secureConnection: false, // TLS requires secureConnection to be false
            port: 587, // port for secure SMTP
            tls: {
                rejectUnauthorized: false,
            },
            auth: {
                user: USER,
                pass: PASS
            }
        })
    }

    enviar = async (to, subjectAndBodyProvider) => {
        const info = {
            from: USER,
            to : to,
            subject: subjectAndBodyProvider.subject,
            html: subjectAndBodyProvider.body
        }

        try {
            await this.transporter.sendMail(info)
            console.log('email enviado')
        } catch (error) {
            throw new Error(`error al enviar el mail , ${error}`)
        }
    }
}

export default Mailer