
/*
* Autor: Galperin Gustavo
*/

class BaseTest{
    constructor(dominio, resumen){
        this.dominio = dominio;
        this.resumen = resumen
    }

    async run(tests, callback){
        for (const test of tests) {
            try {
                await test.test()
                await this.resumen.agregar(this.dominio, test.desc, 'ok')
            } catch (error) {
                await this.resumen.agregar(this.dominio, test.desc, `error --> ${error.message}`)
            }
            
            if(callback)
                await callback()
        }
    }
}

export default BaseTest