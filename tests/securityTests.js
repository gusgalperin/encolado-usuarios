import ClienteHTTP from './clienteHTTP.js'
import Server from '../src/server.js'
import { PORT } from '../src/config.js'
import { getDao } from '../src/persistencia/daoFactory.js'
import BaseTest from './baseTest.js'

class SecurityTests extends BaseTest{
    constructor(resumen){
        super('security', resumen)
        this.server = new Server(PORT)
        this.baseURL = `http://localhost:${PORT}/api`
        this.dao = getDao().eventos
    }

    async ejecutar(){
        await this.server.conectar()

        const tests = [
            {desc: 'caso feliz', test: this.casoFeliz},
            {desc: 'sin apikey al pedir token', test: this.casoSinApiKeyAlPedirToken},
            {desc: 'apikey invalida al pedir token', test: this.casoApiKeyErroreaAlPedirToken},
            {desc: 'sin token al pedir recurso seguro', test: this.casoSinTokenAlPedirRecursoSeguro},
            {desc: 'token invalido al pedir recurso seguro', test: this.casoTokenInvalidoAlPedirRecursoSeguro}
        ]

        await this.run(tests, this.borrarTodo)
        
        await this.server.desconectar()
    }

    casoFeliz = async () => {

        let eventoCreado = await this.crearEvento();

        let token = await this.obtenerAccessToken(eventoCreado.apiKey)

        let evento = await this.obtenerRecursoSeguro(eventoCreado.id, token.access_token)

        if(!evento){
            throw new Error('el evento no se creo')
        }
    }

    casoSinApiKeyAlPedirToken = async () => {
        let eventoCreado = await this.crearEvento();

        try {
            let token = await this.obtenerAccessToken('')
            throw new Error('se pudo obtener token')
        } catch (error) {
            //console.log(JSON.stringify(error))
        }
    }

    casoApiKeyErroreaAlPedirToken = async () => {
        let eventoCreado = await this.crearEvento();

        try {
            let token = await this.obtenerAccessToken(eventoCreado.apiKey.slice(0, -1))
            throw new Error('se pudo obtener token')
        } catch (error) {
            //console.log(JSON.stringify(error))
        }
    }

    casoSinTokenAlPedirRecursoSeguro = async () => {
        let eventoCreado = await this.crearEvento();

        let token = await this.obtenerAccessToken(eventoCreado.apiKey)

        try {
            let evento = await this.obtenerRecursoSeguro(eventoCreado.id, '')
            throw new Error('se pudo obtener recurso seguro')
        } catch (error) {
            //console.log(JSON.stringify(error))
        }
    }

    casoTokenInvalidoAlPedirRecursoSeguro = async () => {
        let eventoCreado = await this.crearEvento();

        let token = await this.obtenerAccessToken(eventoCreado.apiKey)

        try {
            let evento = await this.obtenerRecursoSeguro(eventoCreado.id, token.access_token.slice(0, -1))
            throw new Error('se pudo obtener recurso seguro')
        } catch (error) {
            //console.log(JSON.stringify(error))
        }
    }

    crearEvento = async () => {
        //console.log('creando evento')

        const evento = {
            "codigo": "ARG_CHILE_09-2021",
            "descripcion": "Venta de entradas para el partido de Argentina vs Chile por la fecha 24 de las eliminatorias para la copa del mundo Qatar 2022",
            "fechaHoraInicioEvento": "2021-10-29 00:00:00",
            "fechaHoraFinEvento": "2021-10-29 06:00:00",
            "fechaHoraInicioEncolado": "2021-10-28 22:00:00",
            "tiempoEstimadoAtencionPorUsuarioEnMinutos": 5,
            "usuariosRecurrentes": 1
        }

        const cliente = new ClienteHTTP(`${this.baseURL}/events`)

        let apikeyId = await cliente.post(evento);

        //console.log(`evento creado: ${apikeyId.id}`)

        return apikeyId;
    }

    obtenerAccessToken = async (apikey) => {
        //console.log(`obteniendo access token - apikey: ${apikey}`)

        const cliente = new ClienteHTTP(`${this.baseURL}/auth/access-token`)

        let token = await cliente.post({apikey: apikey});
        
        //console.log(`access token: ${token.access_token}`)

        return token;
    }

    obtenerRecursoSeguro = async (id, token) => {
        //console.log(`obteniendo recurso seguro - id: ${id} token: ${token}`)
        const cliente = new ClienteHTTP(`${this.baseURL}/events/${id}`)

        let evento = await cliente.get(null, {'x-access-token': token});

        //console.log('recurso seguro obtenido')
        //console.log(evento.id)

        return evento;
    }

    borrarTodo = async () => {
        await this.dao.deleteAll()
    }
}

async function ejecutarSecurityTests(resumen){
    const sut = new SecurityTests(resumen)
    await sut.ejecutar();
}

export { ejecutarSecurityTests }