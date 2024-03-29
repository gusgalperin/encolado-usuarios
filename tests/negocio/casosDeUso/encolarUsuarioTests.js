import { v4 as uuidv4 } from 'uuid'
import BaseTest from '../../baseTest.js'
import EncolarUsuario from "../../../src/negocio/casosDeUso/encolarUsuario.js";
import CrearEvento from "../../../src/negocio/casosDeUso/crearEvento.js";
import InvalidArgsError from "../../../src/negocio/exceptions/invalidArgsError.js";
import {getDao} from "../../../src/persistencia/daoFactory.js";

/*
* Autor: Galperin Gustavo
*/

class EncolarUsuarioTests extends BaseTest{
    constructor(resumen){
        super('encolar usuario', resumen)

        this.dao = getDao()
    }

    ejecutar = async () =>{
        const tests = [
            {desc: 'evento no existe', test: this.eventoInexistente},
            {desc: 'mail invalido', test: this.mailInvalido},
            {desc: 'evento con fecha de inicio de encolado mayor a ahora', test: this.eventoExisteFechaInicioMenorAAhora},
            {desc: 'evento ya finalizo', test: this.eventoYaFinalizado},
            {desc: 'encolado ok', test: this.encoladoOk},
            {desc: 'encolar varios usuario', test: this.encolarVariosUsuarios},
            {desc: 'encolar mismo usuario', test: this.encolarMismoUsuario}
        ]

        await this.run(tests, this.borrarTodo)
    }

    eventoInexistente = async () => {
        //arrange
        const sut = new EncolarUsuario()
        const eventoId = uuidv4()

        try {
            //act
            await sut.ejecutar({ eventoId: eventoId, email:'sarasa', nombre:'sarasa', telefono:'sarasa' })
        } catch (error) {
            //assert
            if(error.message == 'no se encontro el evento ' + eventoId)
                return

            throw new Error('error incorrecto: ' + error.message)
        }

        throw new Error('deberia haber tirado error')
    }

    mailInvalido = async () => {
        const sut = new EncolarUsuario()
        const crearEvento = new CrearEvento()
        const now = new Date()
        const evento = {
            codigo: 'sarasa',
            descripcion: 'sarasa',
            fechaHoraFinEvento: new Date(`${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()+2}`),
            fechaHoraInicioEncolado: new Date(`${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()-1}`),
            fechaHoraInicioEvento: new Date(`${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()+1}`),
        }
        const eventoId = await crearEvento.ejecutar(evento)

        //act //assert

        try{
            const usuarioEncolado = await sut.ejecutar({ eventoId: eventoId.id, email:'mail-invalido', nombre:'sarasa', telefono:'sarasa' })

            throw new Error('deberia haber tirado error')
        }
        catch (error){
            if(!error instanceof InvalidArgsError)
                throw new Error('deberia haber devuelto un InvalidArgsError')
        }
    }


    eventoExisteFechaInicioMenorAAhora = async () => {
        //arrange
        const sut = new EncolarUsuario()
        const crearEvento = new CrearEvento()
        const now = new Date()
        const evento = {
            codigo: 'sarasa',
            descripcion: 'sarasa',
            fechaHoraFinEvento: new Date(`${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()+3}`),
            fechaHoraInicioEncolado: new Date(`${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()+1}`),
            fechaHoraInicioEvento: new Date(`${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()+2}`)
        }
        const eventoId = await crearEvento.ejecutar(evento)

        //act

        try{
            await sut.ejecutar({ eventoId: eventoId.id, email:'sarasa', nombre:'sarasa', telefono:'sarasa' })
        }
        catch (error){
            //assert
            if(error.message == 'aun no inicio el horario de encolado')
                return

            throw new Error('error incorrecto: ' + error.message)
        }

        throw new Error('deberia haber tirado error')
    }

    eventoYaFinalizado = async () => {
        //arrange
        const sut = new EncolarUsuario()
        const crearEvento = new CrearEvento()
        const now = new Date()
        const evento = {
            codigo: 'sarasa',
            descripcion: 'sarasa',
            fechaHoraFinEvento: new Date(`${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()-1}`),
            fechaHoraInicioEncolado: new Date(`${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()-3}`),
            fechaHoraInicioEvento: new Date(`${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()-2}`),
        }
        const eventoId = await crearEvento.ejecutar(evento)

        //act

        try{
            await sut.ejecutar({ eventoId: eventoId.id, email:'sarasa', nombre:'sarasa', telefono:'sarasa' })
        }
        catch (error){
            //assert
            if(error.message == 'el evento ya finalizo')
                return

            throw new Error('error incorrecto: ' + error.message)
        }

        throw new Error('deberia haber tirado error')
    }

    encoladoOk = async () => {
        //arrange
        const sut = new EncolarUsuario()
        const crearEvento = new CrearEvento()
        const now = new Date()
        const evento = {
            codigo: 'sarasa',
            descripcion: 'sarasa',
            fechaHoraFinEvento: new Date(`${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()+2}`),
            fechaHoraInicioEncolado: new Date(`${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()-1}`),
            fechaHoraInicioEvento: new Date(`${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()+1}`),
        }
        const eventoId = await crearEvento.ejecutar(evento)

        //act //assert

        try{
            const usuarioEncolado = await sut.ejecutar({ eventoId: eventoId.id, email:'gusgalper@gmail.com', nombre:'sarasa', telefono:'sarasa' })
            if(!usuarioEncolado.usuarioId){
                throw new Error('no devolvio id')
            }
        }
        catch (error){
            throw new Error('no deberia haber tirado error: ' + error.message)
        }
    }

    encolarVariosUsuarios = async () => {
        //arrange
        const sut = new EncolarUsuario()
        const crearEvento = new CrearEvento()
        const now = new Date()
        const evento = {
            codigo: 'sarasa',
            descripcion: 'sarasa',
            fechaHoraFinEvento: new Date(`${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()+2}`),
            fechaHoraInicioEncolado: new Date(`${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()-1}`),
            fechaHoraInicioEvento: new Date(`${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()+1}`),
            tiempoEstimadoAtencionPorUsuarioEnMinutos: 10,
            usuariosConcurrentes: 1
        }
        const eventoId = await crearEvento.ejecutar(evento)

        //act //assert

        try{
            for (let i = 0; i < 5; i++) {
                const usuarioEncolado = await sut.ejecutar({ eventoId: eventoId.id, email:`mail_${i}@gmail.com`, nombre:'sarasa', telefono:'sarasa' })

                if(usuarioEncolado.tiempoEstimadoDeEsperaEnMinutos != i*10){
                    throw new Error(`tiempo de espera incorrecto. devolvio ${usuarioEncolado.tiempoEstimadoDeEsperaEnMinutos} deberia ser ${i*10}`)
                }
            }

        }
        catch (error){
            throw new Error('no deberia haber tirado error: ' + error.message)
        }
    }

    encolarMismoUsuario = async () => {
        //arrange
        const sut = new EncolarUsuario()
        const crearEvento = new CrearEvento()
        const now = new Date()
        const evento = {
            codigo: 'sarasa',
            descripcion: 'sarasa',
            fechaHoraFinEvento: new Date(`${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()+2}`),
            fechaHoraInicioEncolado: new Date(`${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()-1}`),
            fechaHoraInicioEvento: new Date(`${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()+1}`),
            tiempoEstimadoAtencionPorUsuarioEnMinutos: 10,
            usuariosConcurrentes: 1
        }
        const eventoId = await crearEvento.ejecutar(evento)

        //act //assert

        try{
            let results = []

            for (let i = 0; i < 5; i++) {
                const usuarioEncolado = await sut.ejecutar({ eventoId: eventoId.id, email:'siempreElMismoUsuario@mail.com', nombre:'sarasa', telefono:'sarasa' })

                results.push(usuarioEncolado)
            }

            if(!results.every(r => r.usuarioId == results[0].usuarioId)){
                throw new Error('debería haber devuelto siempre el mismo id')
            }

        }
        catch (error){
            throw new Error('no deberia haber tirado error: ' + error.message)
        }
    }

    borrarTodo = async () =>{
        await this.dao.usuarios.deleteAll()
        await this.dao.eventos.deleteAll()
    }


}

async function ejecutarEncolarUsuarioTests(resumen){
    const sut = new EncolarUsuarioTests(resumen)
    await sut.ejecutar()
}

export { ejecutarEncolarUsuarioTests }