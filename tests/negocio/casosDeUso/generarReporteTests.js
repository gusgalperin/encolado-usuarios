import GenerarReporte from '../../../src/negocio/casosDeUso/generarReporte.js'
import JsonToExcel from '../../../src/utils/jsonToExcel.js'
import BaseTest from '../../baseTest.js'
import { v4 as uuidv4 } from 'uuid'
import { getDao } from '../../../src/persistencia/daoFactory.js';
/* Ruiz, Daniel */
class GenerarReporteTests extends BaseTest {
    constructor(resumen) {
        super('Generar Reportes', resumen);
        this.dao = getDao()
    }

    ejecutar = async (  ) => {
        await this.run([{desc:"generarReporte",test: this.generarReporte}])
    }

    generarReporte = async ( ) => {
        const evento = await this.crearEvento()
        await this.crearUsuario( evento)
        const cu = new GenerarReporte()
        try{
            const result = await cu.ejecutar({ eventoId: evento.id })
            
            console.log(result)
            
        }
        catch (err){
            throw new Error("Algo salio mal: "+err);
        }
    }

    crearEvento = async () =>{
        const now = new Date()
        const evento = {
            id: uuidv4(),
            codigo: 'cod',
            descripcion: 'desc',
            fechaHoraInicioEvento: new Date(`${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()-4}`),
            fechaHoraFinEvento: new Date(`${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()-3}`),
            fechaHoraInicioEncolado: new Date(`${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()-5}`)
        }
        await this.dao.eventos.save( evento )
        return evento
    }

    crearUsuario = async ( evento ) =>{
        const now = new Date()
        const usuario = { 
            eventoId: evento.id, 
            email:'siempre@mail.com', 
            nombre:'sarasa', 
            telefono:'sarasa' ,
            estado :'desencolado',
            id:'123654asdf',
            encoladoEn: new Date(`${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()-1}`),
            desencoladoEn: new Date(`${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()+1}`),
            lugarEnLaCola: 1
        }
        const usuario2 = { 
            eventoId: evento.id, 
            email:'siempreElMismoUsuario@mail.com', 
            nombre:'sarasa', 
            telefono:'sarasa' ,
            estado :'desencolado',
            id:'123654piouyo',
            encoladoEn: new Date(`${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()-1}`),
            desencoladoEn: new Date(`${now.getFullYear()}-${now.getMonth()+1}-${now.getDate()+1}`),
            lugarEnLaCola: 2
        }
        
        await this.dao.usuarios.save(usuario)
        await this.dao.usuarios.save(usuario2)
    }
}

async function ejecutarReporteTests(resumen) {
    const nuevo = new GenerarReporteTests(resumen)
    await nuevo.ejecutar()
}

export { ejecutarReporteTests }