import Server from './server.js'
import { PORT } from './config.js'
import Cliente from './persistencia/mongodb/Cliente.js'

const server = new Server(PORT)
const clienteMongo = new Cliente()

try {
    const puerto = await server.conectar()
    console.log(`conectado en el puerto ${puerto}`)

    await clienteMongo.conectar()
    console.log('conectado a mongo')
    
} catch (error) {
    console.log('ups, hubo un error...')
} finally {
    server.desconectar()
    await clienteMongo.desconectar()
}