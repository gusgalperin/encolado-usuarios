import BaseDaoFs from "./baseDaoFS.js";
import fs from 'fs'

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

    update = async (usuario) => {
        const usuarios = await this.getAll()

        let usuariosNoModificados = usuarios
            .filter(u => u.id != usuario.id)

        usuariosNoModificados.push(usuario)

        const txt = JSON.stringify(usuariosNoModificados, null, 2)
        await fs.promises.writeFile(this.ruta, txt)
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