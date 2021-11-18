import DesencolarUsuario from "../src/negocio/casoDeUso/desencolarUsuario.js";

//desencolamos a el usuario que primero este en  la cola
//busca el evento por su id ,
//valida la fecha en la que inicia el evento para desencolar,
//busca el primero en la cola del evento y si no hay usuarios me mostra un mensaje por pantalla,(no hay usuarios para desencolar)
// luego hace un update a el archivo usuarios.json actualizando su estado y la fecha en la que fue desencolado,
// luego devuelve el id y su mail del usuario, 
// se le informa por mail al usaurio que ya es su turno.

const dato = {
    idEvento: "dfe70c5b-3afb-42f8-a102-b0ecee07cd24"
    // idEvento: "culquierCosa" // dato invalido

}
const desencolar = new DesencolarUsuario()

try {
    const info = await desencolar.ejecutar(dato.idEvento)
    console.log(info)
} catch (error) {
    throw new Error(`algo salio mal ${error}`)

}