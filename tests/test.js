import { USE_MONGO } from '../src/config.js';
import { ejecutarSecurityTests }  from './securityTests.js';
import Cliente from '../src/persistencia/mongodb/Cliente.js'
import Resumen from './resumenTests.js'
import { getDao } from '../src/persistencia/daoFactory.js';
import { ejecutarEncolarUsuarioTests } from './encolarUsuarioTests.js';
import { ejecutarMailerTests } from './mailTest/testMail.js';
import { ejecutarDesencolarUsuarioTests } from './desencolarUsuarioTests.js';
import { ejecutarCargaMasiva } from './testCarga.js';

const resumen = new Resumen()
await resumen.reset()

let clienteMongo;

if (USE_MONGO){
    clienteMongo = Cliente.getCliente()
    await clienteMongo.conectar()

    let dao = getDao()
    await dao.crearIndices()
}

// await ejecutarMailerTests(resumen)
// await ejecutarSecurityTests(resumen)
// await ejecutarEncolarUsuarioTests(resumen)
await ejecutarDesencolarUsuarioTests(resumen)
// await ejecutarCargaMasiva(resumen)

if (USE_MONGO){
    await clienteMongo.desconectar()
}

await resumen.mostrar()