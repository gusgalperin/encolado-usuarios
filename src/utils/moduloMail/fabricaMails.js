import {USER,PASS} from '../../config.js'
import {crearEnviadorDeMails} from '../moduloMail/enviarMail.js'


function crearMailer(){
    return crearEnviadorDeMails(USER,PASS)
}


export { crearMailer }