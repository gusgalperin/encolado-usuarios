import GenerarNumero from "../src/negocio/casosDeUso/generarNumero.js";
import { v4 as uuidv4 } from 'uuid'
import { getDao } from '../src/persistencia/daoFactory.js'
import BaseTest from './baseTest.js'


class GenerarNumeroTests extends BaseTest {
    constructor(resumen){
        super('generarNumero', resumen)
        this.dao = getDao().numeros
    }

    async ejecutar(){
        const tests = [
            {desc: 'generar muchos numeros', test: this.generarMuchosNumeros},
            {desc: 'generar duplicado', test: this.generarNumeroDuplicado}
        ]

        await this.run(tests)
    }

    generarMuchosNumeros = async () => {
        const cu = new GenerarNumero()
        const eventoId = uuidv4();
        for (let index = 0; index < 10; index++) {
            await cu.ejecutar({ eventoId: eventoId, usuarioId: uuidv4() })
        }

        const numerosGuardados = await this.dao.obtenerTodosParaEvento(eventoId)

        let salioBien = true;

        for (let index = 0; index < numerosGuardados.length; index++) {
            salioBien = salioBien && numerosGuardados[index].numero == index + 1;            
        }

        if(!salioBien){
            throw new Error('no se generaron numeros secuenciales')
        }
    }

    generarNumeroDuplicado = async () => {
        const cu = new GenerarNumero()
        const eventoId = uuidv4();
        const usuario = uuidv4();
        let numeroUno = await cu.ejecutar({ eventoId: eventoId, usuarioId: usuario })
        let numeroDos = await cu.ejecutar({ eventoId: eventoId, usuarioId: usuario })

        console.log(numeroUno + ' ' + numeroDos);

        if(numeroUno != numeroDos){
            throw new Error('deberia haber devuelto el mismo numero que la primera vez')
        }
    }
}

async function ejecutarGenerarNumerosTests(resumen){
    const sut = new GenerarNumeroTests(resumen)
    await sut.ejecutar()
}

export { ejecutarGenerarNumerosTests }