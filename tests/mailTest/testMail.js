import {crearMailer} from '../../src/utils/moduloMail/fabricaMails.js'
import PruebaProvider from '../../src/utils/moduloMail/pruebaProvider.js'
import BaseTest from "../baseTest.js";

class MailerTests extends BaseTest{
    constructor(resumen) {
        super('mailer', resumen)
    }

    ejecutar = async () =>{
        const tests = [
            {desc: 'enviar mail', test: this.testMail}
        ]

        await this.run(tests)
    }

    testMail = async () => {
        const datos = {
            nombre:'Alex',
            apellido:'nuñez',
            mail: 'gusgalper@gmail.com'
        }

        //const mailer = crearMailer(true)
        const mailer = crearMailer()

        try {
            await mailer.enviar(datos.mail, new PruebaProvider(datos))
        } catch (error) {
            throw new Error (`Ocurrio un error: ${error}`)
        }
    }
}

async function ejecutarMailerTests(resumen){
    const sut = new MailerTests(resumen)
    await sut.ejecutar()
}

export { ejecutarMailerTests }