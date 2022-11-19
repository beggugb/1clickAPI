import { Router } from 'express';
import categoriaController from '../controllers/categoriaController.js';

const router = Router();

router.get('/data/:page/:num/:prop/:value',categoriaController.dataCategorias)
router.post('/search/lista',categoriaController.searchCategoria)
router.post('/:tipo',categoriaController.saveCategoria)
router.put('/:id/:tipo',categoriaController.setUpdate)
router.get('/item/:id',categoriaController.getItem)
router.get('/listas/items',categoriaController.getItems)
router.delete('/:id',categoriaController.setDelete)

router.get('/lista/items',categoriaController.getLista)
export default router;