import fs from 'fs'

class Resumen{
    constructor(){
        this.ruta = './tests/db_resumen_tests.json'
        this.empezoEn = new Date()
    }

    getAll = async () => {
        const txt = await fs.promises.readFile(this.ruta, 'utf-8')
        const docs = JSON.parse(txt)
        return docs
    }

    save = async (doc) => {
        const docs = await this.getAll()
        docs.push(doc)
        const txt = JSON.stringify(docs, null, 2)
        await fs.promises.writeFile(this.ruta, txt)
    }

    reset = async () => {
        const txt = JSON.stringify([], null, 2)
        await fs.promises.writeFile(this.ruta, txt)
    }

    agregar = async (dominio, descripcion, resultado) => {
        await this.save({dominio, descripcion, resultado})
    }

    mostrar = async () => {
        const tiempo = Math.abs(new Date() - this.empezoEn);

        const resumen = await this.getAll()

        let totalOk = 0;
        let totalError = 0;

        console.log('*********** RESUMEN ***********')
        console.log(`Duración: ${tiempo} milisegundos`)

        for (let index = 0; index < resumen.length; index++) {
            const r = resumen[index];

            console.log(`${index + 1}. ${r.dominio} | ${r.descripcion} | ${r.resultado}`)

            if(r.resultado == 'ok')
                totalOk++
            else
                totalError++
        }
        
        console.log(`Total ok: ${totalOk}`)
        console.log(`Total error: ${totalError}`)

        console.log('*******************************')
    }

}

export default Resumen