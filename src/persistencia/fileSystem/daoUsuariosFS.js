import BaseDaoFs from "./baseDaoFS.js";
import fs from 'fs'
import NumeroDuplicadoPorNumero from "../../negocio/exceptions/numeroDuplicadoPorNumero.js";
import NumeroDuplicadoPorUsuario from "../../negocio/exceptions/numeroDuplicadoPorUsuario.js";

class DaoUsuariosFS extends BaseDaoFs{

    constructor(ruta) {
        super(ruta);

    }

    buscarPrimeroEnLaCola = async (idEvento) => {
       const usuarios = await this.getAll()

       if (usuarios.length == 0) {
           return null
       }

       let listaUsuarios = usuarios
           .filter(u => u.eventoId == idEvento)
           .filter(u => u.estado == 'encolado')

       listaUsuarios.sort((a, b) => a.lugarEnLaCola - b.lugarEnLaCola)

       return listaUsuarios[0]
    }

    buscarTodos = async (eventoId) => {
        const usuarios = await this.getAll()

        if (usuarios.length == 0) {
            return null
        }

        let listaUsuarios = usuarios
            .filter(u => u.eventoId == eventoId)

        return listaUsuarios
    }

    update = async (usuario) => {
        const usuarios = await this.getAll()

        let usuariosNoModificados = usuarios
            .filter(u => u.id != usuario.id)

        usuariosNoModificados.push(usuario)

        const txt = JSON.stringify(usuariosNoModificados, null, 2)
        await fs.promises.writeFile(this.ruta, txt)
    }

    async save(doc){
        const usuarios = await this.getAll()

        const usuarioExiste = usuarios
            .filter(u => u.email == doc.email)
            .filter(u => u.eventoId == doc.eventoId)

        if(usuarioExiste.length > 0)
            throw new NumeroDuplicadoPorUsuario()

        const numeroExiste = usuarios
            .filter(u => u.lugarEnLaCola == doc.lugarEnLaCola)
            .filter(u => u.eventoId == doc.eventoId)

        if(numeroExiste.length > 0)
            throw new NumeroDuplicadoPorNumero()

        await super.save(doc)
    }

    getCantidadDeUsuariosPrevios = async(eventoId, usuarioId, lugarEnLaCola) => {
        const usuarios = await this.getAll()

        let usuariosAntes =  usuarios
            .filter(u => u.eventoId == eventoId)
            .filter(u => u.estado == "encolado")
            .filter(u => u.lugarEnLaCola < lugarEnLaCola)

        return usuariosAntes.length
    }

    obtenerUltimoNumero = async (eventoId) => {
        const usuarios = await this.getAll()

        if (usuarios.length == 0) {
            return null
        }

        let listaUsuarios = usuarios
            .filter(u => u.eventoId == eventoId)
            .filter(u => u.estado == 'encolado')

        listaUsuarios.sort((a, b) => b.lugarEnLaCola - a.lugarEnLaCola)

        if(listaUsuarios.length == 0)
            return 0

        return listaUsuarios[0].lugarEnLaCola
    }

    getOne = async (eventoId, email, estado) => {
        const usuarios = await this.getAll()

        let usuario =  usuarios
            .filter(u => u.eventoId == eventoId)
            .filter(u => u.estado == estado)
            .filter(u => u.email == email)

        if(!usuario)
            return null

        return usuario[0]
    }
}

export default DaoUsuariosFS