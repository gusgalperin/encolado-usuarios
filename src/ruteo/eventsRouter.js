import { Router } from 'express'
import { verifyToken } from '../middleware/authJwt.js'
import EventsApi from '../negocio/eventsApi.js'
import CrearEvento from '../negocio/casosDeUso/crearEvento.js';
import EncolarUsuario from "../negocio/casosDeUso/encolarUsuario.js";
import multer from 'multer'
import CargaMasiva from "../negocio/casosDeUso/cargaMasiva.js";
import DesencolarUsuario from "../negocio/casosDeUso/desencolarUsuario.js";
import GenerarReporte from "../negocio/casosDeUso/generarReporte.js";
import JsonToExcel from "../utils/jsonToExcel.js";

const router = Router();
const api = new EventsApi();
const upload = multer({ dest: 'uploads/' })

router.get('/', verifyToken, async (req, res, next) => {
    try {
        res.send(await api.buscarTodo())
    }
    catch (error){
        next(error)
    }
})

router.get('/:id', verifyToken, async (req, res, next) => {
    try {
        const evento = await api.buscarPorId(req.params.id)
        res.send(evento)
    }
    catch(error){
        next(error)
    }
})

router.post('/', async  (req, res, next) => {
    try {
        const cu = new CrearEvento()
        const result = await cu.ejecutar(req.body)
        res.status(201);
        res.send(result);
    }
    catch (error){
        next(error)
    }
})

router.post('/bulk', upload.single('events'), async  (req, res) => {
    try {
        const cu = new CargaMasiva()
        const result = await cu.ejecutar({fileName: req.file.path})

        res.status(201);
        res.send(result)
    }
    catch (error){
        next(error)
    }
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


router.post('/:id/desencolar', verifyToken, async  (req, res, next) => {
    const cu = new DesencolarUsuario()
    try{
        const result = await cu.ejecutar({eventoId: req.params.id})

        res.status(201);
        res.send(result);
    }
    catch (err){
        next(err)
    }

})


router.get('/:id/reporte', async (req, res, next) => {
    const cu = new GenerarReporte()
    const jsonToExcel = new JsonToExcel()

    try{
        const eventoId = req.params.id
        const result = await cu.ejecutar({ eventoId: eventoId })

        const filePath = jsonToExcel.convertir(result.reporte, result.evento.codigo)

        res.download(filePath);
    }
    catch (err){
        next(err)
    }
})


export { router }