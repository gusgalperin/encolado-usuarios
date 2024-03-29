import { USE_MONGO } from '../src/config.js';
import { ejecutarSecurityTests }  from './security/securityTests.js';
import Cliente from '../src/persistencia/mongodb/Cliente.js'
import Resumen from './helpers/resumenTests.js'
import { getDao } from '../src/persistencia/daoFactory.js';
import { ejecutarEncolarUsuarioTests } from './negocio/casosDeUso/encolarUsuarioTests.js';
import { ejecutarMailerTests } from './mailTest/testMail.js';
import { ejecutarDesencolarUsuarioTests } from './negocio/casosDeUso/desencolarUsuarioTests.js';
import { ejecutarCargaMasiva } from './negocio/casosDeUso/testCarga.js';
import { ejecutarReporteTests } from './negocio/casosDeUso/generarReporteTests.js'
import {ejecutarCrearEventoTests} from "./negocio/casosDeUso/crearEventoTests.js";

const resumen = new Resumen()
await resumen.reset()

const dao = getDao()

let clienteMongo;

if (USE_MONGO){
    clienteMongo = Cliente.getCliente()
    await clienteMongo.conectar()

    await dao.crearIndices()
}

try {
    await ejecutarMailerTests(resumen)
    await ejecutarSecurityTests(resumen)
    await ejecutarEncolarUsuarioTests(resumen)
    await ejecutarDesencolarUsuarioTests(resumen)
    await ejecutarCargaMasiva(resumen)
    await ejecutarCrearEventoTests(resumen)
    await ejecutarReporteTests(resumen)
}
catch (error){
    console.log('hubo un error al correr los tests')
    console.log(error.message)
    console.log(error.stackTrace)
}
finally {
    await dao.usuarios.deleteAll()
    await dao.eventos.deleteAll()
}

if (USE_MONGO){
    await clienteMongo.desconectar()
}

await resumen.mostrar()

await resumen.deleteAll()