import EmailDataProvider from './emailDataProvider.js'

/*
* Autor: Galperin Gustavo
*/


class EncoladoEmailData extends EmailDataProvider {

    constructor(datos){
        super(
            'A no perder la paciencia...',
            `<table border="0" cellpadding="0" cellspacing="0" width="600px" background-color="#2d3436" bgcolor="#2d3436">
                <tr height="200px">  
                    <td bgcolor="" width="600px">
                        <h1 style="color: #fff; text-align:center">Bienvenido ${datos.nombre}</h1>
                        <p  style="color: #fff; text-align:center">
                            Estas esperando para el evento ${datos.codigoEvento}
                        </p>
                        <p  style="color: #fff; text-align:center">
                            Tu lugar en la cola es: ${datos.lugarEnlaCola}
                        </p>
                        <p  style="color: #fff; text-align:center">
                            Tiempo de espera estimado: ${datos.tiempoEspera} minutos
                        </p>
                    </td>
                </tr>
                <tr bgcolor="#fff">
                    <td style="text-align:center">
                        <p style="color: #000">¡Un mundo de servicios a su disposición!</p>
                    </td>
                </tr>
            </table>`
        )
    }
}

export default EncoladoEmailData