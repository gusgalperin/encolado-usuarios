import { USE_MONGO } from '../src/config.js';
import { ejecutarGenerarNumerosTests } from './generarNumeroTests.js'
import { ejecutarSecurityTests }  from './securityTests.js';
import Cliente from '../src/persistencia/mongodb/Cliente.js'
import Resumen from './resumenTests.js'

const resumen = new Resumen()
await resumen.reset()

let clienteMongo;

if (USE_MONGO){
    clienteMongo = Cliente.getCliente()
    await clienteMongo.conectar()
}

await ejecutarGenerarNumerosTests(resumen)
await ejecutarSecurityTests(resumen)

if (USE_MONGO){
    await clienteMongo.desconectar()
}

await resumen.mostrar()