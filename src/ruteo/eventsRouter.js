import { Router } from 'express'
import { verifyToken } from '../middleware/authJwt.js'
import EventsApi from '../negocio/eventsApi.js'
import CrearEvento from '../negocio/casosDeUso/crearEvento.js';
import EncolarUsuario from "../negocio/casosDeUso/encolarUsuario.js";
import multer from 'multer'
import convertidor from "../utils/excelToJson.js";
import CargaMasiva from "../negocio/casosDeUso/cargaMasiva.js";

const router = Router();
const api = new EventsApi();
const upload = multer({ dest: 'uploads/' })

router.get('/', verifyToken, async (req, res) => {
    res.send(await api.buscarTodo())
})

router.get('/:id', verifyToken, async (req, res) => {
    const evento = await api.buscarPorId(req.params.id)
    if (evento) {
        res.send(evento)
    } else {
        res.status(404)
        res.send({ error: 'evento inexistente' })
    }
})

router.post('/', async  (req, res) => {
    const cu = new CrearEvento()
    const result = await cu.ejecutar(req.body)
    res.status(201);
    res.send(result);
})

router.post('/bulk', upload.single('events'), async  (req, res) => {
    const cu = new CargaMasiva()
    const result = await cu.ejecutar({fileName: req.file.path})

    res.status(201);
    res.send(result)
})

router.post('/:id/encolar', verifyToken, async  (req, res, next) => {
    const cu = new EncolarUsuario()

    try{
        let data = req.body
        data.eventoId = req.params.id

        const result = await cu.ejecutar(data)

        res.status(201);
        res.send(result);
    }
    catch (err){
        next(err)
    }

})

export { router }