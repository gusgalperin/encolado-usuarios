import EmailDataProvider from './emailDataProvider.js'

// --------------Hecho por Alex Ignacio Nuñez------------------


class DesencoladoEmailData extends EmailDataProvider {

    constructor(datos){
        super('LLEGO TU TURNO...',

            `<table border="0" cellpadding="0" cellspacing="0" width="600px" background-color="#2d3436" bgcolor="#2d3436">
                <tr height="200px">  
                    <td bgcolor="" width="600px">
                        <h1 style="color: #fff; text-align:center">Hola  ${datos.nombre}</h1>
                        <p  style="color: #fff; text-align:center">
                            Llego tu turno para el evento que esperabas!!!!!
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

export default DesencoladoEmailData