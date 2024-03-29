import CrearEvento from "../../../src/negocio/casosDeUso/crearEvento.js";
import DesencolarUsuario from "../../../src/negocio/casosDeUso/desencolarUsuario.js";
import EncolarUsuario from "../../../src/negocio/casosDeUso/encolarUsuario.js";
// import { getDao } from "../src/persistencia/daoFactory.js";
import BaseTest from "../../baseTest.js";
import {getDao} from "../../../src/persistencia/daoFactory.js";

class DesencolarUsuarioTests extends BaseTest {

    constructor(resumen) {
        super('desencolar usuario', resumen);
        this.dao = getDao()
    }

    ejecutar = async () => {
        const tests = [
            { desc: 'evento no existe', test: this.eventoInexistente },
            {desc: 'no hay usuarios para desencolar', test: this.noHayUsuariosParaDesencolar},
            // {desc: 'evento ya finalizo', test: this.eventoYaFinalizado},
            {desc: 'desencolado ok', test: this.desencolado}
        ]

        await this.run(tests, async () => this.dao.eventos.deleteAll())
    }


    eventoInexistente = async () => {
        const obj = new DesencolarUsuario()
        const dato = { id: "cualquierCosa" }
        try {
            const evento = await obj.ejecutar({eventoId: dato.id})
            console.log(evento)
        } catch (error) {
            
            if (error.message == 'no se encontro el evento ' + dato.id)
                return

            throw new Error('error incorrecto: ' + error.message)
        }
        throw new Error('deberia haber tirado error')
    }


    noHayUsuariosParaDesencolar = async () =>{
        const obj2 = new DesencolarUsuario()
        const idEvento =  await this.crearEvento()
        try {
            const dato = await obj2.ejecutar({eventoId: idEvento.id})
            console.log(dato)
        } catch (error) {
            if (error.message == "no hay usuarios para desencolar")
                return

            throw new Error('error incorrecto: ' + error.message)
        }
        throw new Error('deberia haber tirado error')
    }

    crearEvento = async () => {
        const now = new Date()
        const evento = {
            id: '4916b5ac-f12d-4901-ad32-b38ba3053499',
            codigo: 'nuevoEvento',
            descripcion: 'nuevoEvento',
            fechaHoraFinEvento: new Date(`${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()+2}`),
            fechaHoraInicioEncolado: new Date(`${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()-2}`),
            fechaHoraInicioEvento: new Date(`${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()-1}`),
        }
        await this.dao.eventos.save( evento )
        return evento
    }

  
    desencolado = async () =>{
        const objt3 = new DesencolarUsuario()
        const usuarioNuevo = new EncolarUsuario()
        // const crearEventoNuevo = new CrearEvento
        // const now = new Date()
        // const eve = {
        //     codigo: 'cuak',
        //     descripcion: 'cuak',
        //     fechaHoraFinEvento: new Date(`${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()+2}`),
        //     fechaHoraInicioEncolado: new Date(`${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()-1}`),
        //     fechaHoraInicioEvento: new Date(`${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()+1}`),
        // }
        const idNuevo = await this.crearEvento()
        try{
            const dato = await usuarioNuevo.ejecutar({ eventoId: idNuevo.id, email:'benjamyn2187@gmail.com', nombre:'juancito', telefono:'1232456' })
            const desencolado = await objt3.ejecutar({eventoId: idNuevo.id})
            console.log(desencolado)
        }
        catch (error){
            throw new Error('no deberia haber tirado error: ' + error.message)
        }
   
    }

}

async function ejecutarDesencolarUsuarioTests(resumen) {
    const nuevo = new DesencolarUsuarioTests(resumen)
    await nuevo.ejecutar()
}

export { ejecutarDesencolarUsuarioTests }