import xlsx from 'xlsx'

/*
Autor: Germán Mansilla
*/

class JsonToExcel {

    convertir = (jsonData, nombreArchivo) => {
        if(nombreArchivo.length > 30)
            nombreArchivo = nombreArchivo.substring(0, 30)

        const workSheet = xlsx.utils.json_to_sheet(jsonData)
        const workBook=xlsx.utils.book_new()

        xlsx.utils.book_append_sheet(workBook, workSheet, nombreArchivo)
        xlsx.write(workBook, {bookType: "xlsx", type: "buffer"})
        xlsx.write(workBook,{bookType:"xlsx", type: "binary"})

        const filePath = `${nombreArchivo}.xlsx`

        xlsx.writeFile(workBook, filePath)

        return filePath
    }
}

export default JsonToExcel