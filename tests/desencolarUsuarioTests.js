import BaseTest from "./baseTest.js";

class DesencolarUsuarioTests extends BaseTest{

    constructor(resumen) {
        super('desencolar usuario', resumen);
    }

    ejecutar = async () =>{
        const tests = [

        ]

        await this.run(tests)
    }
}

async function ejecutarDesencolarUsuarioTests(resumen){
    const sut = new DesencolarUsuarioTests(resumen)
    await sut.ejecutar()
}

export { ejecutarDesencolarUsuarioTests }