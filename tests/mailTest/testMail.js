import {crearMailer} from '../../src/utils/moduloMail/fabricaMails.js'
import PruebaProvider from '../../src/utils/moduloMail/pruebaProvider.js'

async function testMail () {
    const datos = {
        nombre:'Alex',
        apellido:'nuñez',
        mail: 'gusgalper@gmail.com'
    }

    const mailer = crearMailer(new PruebaProvider(datos))

    try {
        await mailer.enviar(datos.mail)
    } catch (error) {
        throw new Error (`Ocurrio un error: ${error}`)
    }
}

export { testMail }