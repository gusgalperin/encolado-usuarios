import xlsx from 'xlsx'

export default class ExcelToJson {

    convertir(filepath) {
        const excel = xlsx.readFile(filepath);

        let nombreHoja = excel.SheetNames;
        let datos = xlsx.utils.sheet_to_json(excel.Sheets[nombreHoja[0]]);
        const jDatos = [];
        for (let i = 0; i < datos.length; i++) {
            const dato = datos[i];
            jDatos.push({
                ...dato,
                fechaHoraInicioEvento: new Date((dato.fechaHoraInicioEvento - (25567 + 2)) * 86400 * 1000),
                fechaHoraFinEvento: new Date((dato.fechaHoraFinEvento - (25567 + 2)) * 86400 * 1000),
                fechaHoraInicioEncolado: new Date((dato.fechaHoraInicioEncolado - (25567 + 2)) * 86400 * 1000),

            });
        }
        return jDatos;
    }

}