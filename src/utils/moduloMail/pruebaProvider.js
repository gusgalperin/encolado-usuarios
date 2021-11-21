import EmailDataProvider from './emailDataProvider.js'

// --------------Hecho por Alex Ignacio Nuñez------------------

class PruebaProvider extends EmailDataProvider {

    constructor(datos){
        super(
            'Bienvenido al TP',
            `<table border="0" cellpadding="0" cellspacing="0" width="600px" background-color="#2d3436" bgcolor="#2d3436">
                <tr height="200px">  
                    <td bgcolor="" width="600px">
                        <h1 style="color: #fff; text-align:center">Bienvenido ${datos.nombre}</h1>
                        <p  style="color: #fff; text-align:center">
                            <span style="color: #e84393">${datos.nombre}</span> 
                            a la aplicación EVENTS ORT
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

export default PruebaProvider