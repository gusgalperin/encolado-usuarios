import CrearEvento from "../src/negocio/casosDeUso/crearEvento.js";
import DesencolarUsuario from "../src/negocio/casosDeUso/desencolarUsuario.js";
import EncolarUsuario from "../src/negocio/casosDeUso/encolarUsuario.js";
// import { getDao } from "../src/persistencia/daoFactory.js";
import BaseTest from "./baseTest.js";

class DesencolarUsuarioTests extends BaseTest {

    constructor(resumen) {
        super('desencolar usuario', resumen);
    }

    ejecutar = async () => {
        const tests = [
            { desc: 'evento no existe', test: this.eventoInexistente },
            {desc: 'no hay usuarios para desencolar', test: this.noHayUsuariosParaDesencolar},
            // {desc: 'evento ya finalizo', test: this.eventoYaFinalizado},
            {desc: 'deselcolado ok', test: this.desencolado}
        ]

        await this.run(tests)
    }


    eventoInexistente = async () => {
        const obj = new DesencolarUsuario()
        const dato = { id: "cualquierCosa" }
        try {
            const evento = await obj.ejecutar(dato.id)
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
            const dato = await obj2.ejecutar(idEvento.id)
            console.log(dato)
        } catch (error) {
            if (error.message == "no hay usuarios para desencolar")
                return

            throw new Error('error incorrecto: ' + error.message)
        }
        throw new Error('deberia haber tirado error')
    }



    crearEvento = async () => {
        const crearEvento = new CrearEvento
        const now = new Date()
        const evento = {
            codigo: 'nuevoEvento',
            descripcion: 'nuevoEvento',
            fechaHoraFinEvento: new Date(`${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()+2}`),
            fechaHoraInicioEncolado: new Date(`${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()-1}`),
            fechaHoraInicioEvento: new Date(`${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()+1}`),
        }
        const eventoId = await crearEvento.ejecutar(evento)
        return eventoId
    }

  
    desencolado = async () =>{
        const objt3 = new DesencolarUsuario()
        const usuarioNuevo = new EncolarUsuario()
        const crearEventoNuevo = new CrearEvento
        const now = new Date()
        const eve = {
            codigo: 'cuak',
            descripcion: 'cuak',
            fechaHoraFinEvento: new Date(`${now.getFullYear()}-${now.getMonth()+2}-${now.getDate()+2}`),
            fechaHoraInicioEncolado: new Date(`${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()-1}`),
            fechaHoraInicioEvento: new Date(`${now.getFullYear()}-${now.getMonth()+4}-${now.getDate()+1}`),
        }
        const idNuevo = await crearEventoNuevo.ejecutar(eve)
        try{
            const dato = await usuarioNuevo.ejecutar({ eventoId: idNuevo.id, email:'benjamyn2187@gmail.com', nombre:'juancito', telefono:'1232456' })
            const desencolado = await objt3.ejecutar(idNuevo.id)
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