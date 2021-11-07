import fs from 'fs'

class BaseDaoFs {
    constructor (ruta) {
        this.ruta = ruta;
    }

    async getAll(){
        const txt = await fs.promises.readFile(this.ruta, 'utf-8')
        const docs = JSON.parse(txt)
        return docs
    }

    async save(doc) {
        const docs = await this.getAll()
        docs.push(doc)
        const txt = JSON.stringify(docs, null, 2)
        await fs.promises.writeFile(this.ruta, txt)
    }

    async deleteAll(){
        const txt = JSON.stringify([], null, 2)
        await fs.promises.writeFile(this.ruta, txt)
    }
}

export default BaseDaoFs