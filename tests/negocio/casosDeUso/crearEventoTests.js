import BaseTest from "../../baseTest.js";
import CrearEvento from "../../../src/negocio/casosDeUso/crearEvento.js";
import InvalidArgsError from "../../../src/negocio/exceptions/invalidArgsError.js";
import Evento from "../../../src/negocio/entidades/evento.js";
import {getDao} from "../../../src/persistencia/daoFactory.js";
import EventoDuplicado from "../../../src/negocio/exceptions/eventoDuplicado.js";

/*
* Autor: Galperin Gustavo
*/

class CrearEventoTests extends BaseTest{
    constructor(resumen) {
        super('crear evento', resumen);

        this.dao = getDao()
    }

    ejecutar = async () => {
        const tests = [
            {desc: 'codigo invalido', test: this.codigoInvalido},
            {desc: 'descripcion invalida', test: this.descripcionInvalida},
            {desc: 'valores default', test: this.defaults},
            {desc: 'fecha inicio evento mayor a fin evento', test: this.inicioEventoMayorAFinEvento},
            {desc: 'fecha inicio encolado mayor a fin evento', test: this.inicioEncoladoMayorAFinEvento},
            {desc: 'crear evento ok', test: this.crearEventoOk},
            {desc: 'evento duplicado', test: this.crearEventoDuplicado}
        ]

        await this.run(tests)
    }

    codigoInvalido = async () => {
        //arrange
        const now = new Date()

        try {
            //act
            const result = new Evento(
                '',
                'desc',
                new Date(`${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()+2}`),
                new Date(`${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()+3}`),
                new Date(`${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()+1}`),
                10,
                1
            )

            //assert
            throw new Error('deberia haber tirado error')
        }
        catch(error){
            if (!error instanceof InvalidArgsError){
                throw new Error("tipo de error invalido. se esperaba un 'InvalidArgsError'")
            }
            else if(error.message != 'codigo invalido'){
                throw new Error("mensaje de error invalido, se esperaba: 'codigo invalido'")
            }
        }
    }

    descripcionInvalida = async () => {
        //arrange
        const now = new Date()

        try {
            //act
            const result = new Evento(
                'cod',
                '',
                new Date(`${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()+2}`),
                new Date(`${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()+3}`),
                new Date(`${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()+1}`),
                10,
                1
            )

            //assert
            throw new Error('deberia haber tirado error')
        }
        catch(error){
            if (!error instanceof InvalidArgsError){
                throw new Error("tipo de error invalido. se esperaba un 'InvalidArgsError'")
            }
            else if(error.message != 'descripcion invalida'){
                throw new Error("mensaje de error invalido, se esperaba: 'descripcion invalida'")
            }
        }
    }

    defaults = async () => {
        const sut = new CrearEvento()

        //arrange
        const now = new Date()

        try {
            //act
            const result = new Evento(
                'cod',
                'desc',
                new Date(`${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()+2}`),
                new Date(`${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()+3}`),
                new Date(`${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()+1}`)
            )

            //assert
            if(result.tiempoEstimadoAtencionPorUsuarioEnMinutos != result.DEFAULT_TIEMPO_ATENCION){
                throw new Error(`tiempoEstimadoAtencionPorUsuarioEnMinutos deberia haber sido: ${result.DEFAULT_TIEMPO_ATENCION}`)
            }
            if(result.usuariosConcurrentes != result.DEFAULT_USUARIOS_CONCURRENTES){
                throw new Error(`usuariosConcurrentes deberia haber sido: ${result.DEFAULT_USUARIOS_CONCURRENTES}`)
            }
        }
        catch(error){
            throw new Error(`no deberia haber tirado error: '${error.message}'` )
        }
    }

    inicioEventoMayorAFinEvento = async () => {
        const sut = new CrearEvento()

        //arrange
        const now = new Date()

        try {
            //act
            const result = new Evento(
                'cod',
                'desc',
                new Date(`${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()+4}`),
                new Date(`${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()+3}`),
                new Date(`${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()+1}`)
            )

            //assert
            throw new Error(`deberia haber tirado error`)
        }
        catch(error){
            if (!error instanceof InvalidArgsError){
                throw new Error("tipo de error invalido. se esperaba un 'InvalidArgsError'")
            }
            else if(error.message != 'la fecha de inicio de evento debe ser inferior a la fecha de fin de evento'){
                throw new Error("mensaje de error invalido, se esperaba: 'la fecha de inicio de evento debe ser inferior a la fecha de fin de evento'")
            }
        }
    }

    inicioEncoladoMayorAFinEvento = async () => {
        const sut = new CrearEvento()

        //arrange
        const now = new Date()

        try {
            //act
            const result = new Evento(
                'cod',
                'desc',
                new Date(`${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()+2}`),
                new Date(`${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()+3}`),
                new Date(`${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()+3}`)
            )

            //assert
            throw new Error(`deberia haber tirado error`)
        }
        catch(error){
            if (!error instanceof InvalidArgsError){
                throw new Error("tipo de error invalido. se esperaba un 'InvalidArgsError'")
            }
            else if(error.message != 'fecha inicio encolado incorrecta'){
                throw new Error("mensaje de error invalido, se esperaba: 'fecha inicio encolado incorrecta'")
            }
        }
    }

    crearEventoOk = async () => {
        const sut = new CrearEvento()

        //arrange
        //act
        const now = new Date()

        try {
            const result = await sut.ejecutar({
                codigo: 'cod',
                descripcion: 'desc',
                fechaHoraInicioEvento: new Date(`${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()+2}`),
                fechaHoraFinEvento: new Date(`${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()+3}`),
                fechaHoraInicioEncolado: new Date(`${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()+1}`)
            })

            //assert
            if(!result){
                throw new Error('no devolvio datos')
            }

            if(!result.id){
                throw new Error('no devolvio id')
            }

            if(!result.apiKey){
                throw new Error('no devolvio apikey')
            }
        }
        catch(error){
            throw new Error(`no deberia haber tirado error: '${error.message}'` )
        }
        finally {
            await this.dao.eventos.deleteAll()
        }
    }

    crearEventoDuplicado = async () => {
        const sut = new CrearEvento()

        //arrange
        const now = new Date()

        const evento = {
            codigo: 'cod',
            descripcion: 'desc',
            fechaHoraInicioEvento: new Date(`${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()+2}`),
            fechaHoraFinEvento: new Date(`${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()+3}`),
            fechaHoraInicioEncolado: new Date(`${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()+1}`)
        }

        //act

        try {
            const evento1 = await sut.ejecutar(evento)
            const evento2 = await sut.ejecutar(evento)

            throw new Error('deberia haber tirado EventoDuplicado')
        }
        catch(error){
            if (!error instanceof EventoDuplicado){
                throw new Error("tipo de error invalido. se esperaba un 'EventoDuplicado'")
            }
        }
        finally {
            await this.dao.eventos.deleteAll()
        }
    }
}

async function ejecutarCrearEventoTests(resumen) {
    const nuevo = new CrearEventoTests(resumen)
    await nuevo.ejecutar()
}

export { ejecutarCrearEventoTests }