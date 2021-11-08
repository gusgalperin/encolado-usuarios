import Server from './server.js'
import { PORT, USE_MONGO } from './config.js'
import Cliente from './persistencia/mongodb/Cliente.js'
import { getDao } from './persistencia/daoFactory.js'

const server = new Server(PORT)

try {
    const puerto = await server.conectar()
    console.log(`conectado en el puerto ${puerto}`)

    let clienteMongo;

    if(USE_MONGO){
        clienteMongo = Cliente.getCliente()
        await clienteMongo.conectar()
        console.log('conectado a mongo')

        const dao = getDao()
        await dao.crearIndices();
    }
    
} catch (error) {
    console.log('ups, hubo un error...')
} finally {
    server.desconectar()

    if(USE_MONGO)
        await clienteMongo.desconectar()
}