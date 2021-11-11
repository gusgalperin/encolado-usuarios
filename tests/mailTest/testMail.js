import {crearMailer} from '../../src/utils/moduloMail/fabricaMails.js'
import {asuntoBienvenida,generarCuerpoHtml} from '../../src/utils/moduloMail/detallesMail.js'


const mailer = crearMailer()
const datos = {
    nombre:'Alex',
    apellido:'nuñez',
    mail: 'benjamyn2187@gmail.com',
    
}

try {
    mailer.enviarMensaje(datos.mail,asuntoBienvenida,generarCuerpoHtml(datos))

} catch (error) {
    throw new Error (`Ocurrio un error: ${error}`)
}