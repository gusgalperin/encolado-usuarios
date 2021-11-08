import { USE_MONGO } from '../src/config.js';
import { ejecutarGenerarNumerosTests } from './generarNumeroTests.js'
import { ejecutarSecurityTests }  from './securityTests.js';
import Cliente from '../src/persistencia/mongodb/Cliente.js'
import Resumen from './resumenTests.js'
import { getDao } from '../src/persistencia/daoFactory.js';

const resumen = new Resumen()
await resumen.reset()

let clienteMongo;

if (USE_MONGO){
    clienteMongo = Cliente.getCliente()
    await clienteMongo.conectar()

    let dao = getDao()
    await dao.crearIndices()
}

await ejecutarGenerarNumerosTests(resumen)
await ejecutarSecurityTests(resumen)

if (USE_MONGO){
    await clienteMongo.desconectar()
}

await resumen.mostrar()