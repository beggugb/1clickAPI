import { Router } from 'express';
import cajeroController from '../controllers/cajeroController.js';

const router = Router();

router.get('/data/:page/:num/:prop/:value',cajeroController.dataCajeros)
router.post('/search/lista',cajeroController.searchCajero)
router.post('/:tipo',cajeroController.saveCajero)
router.put('/:id/:tipo',cajeroController.setUpdate)
router.get('/item/:id',cajeroController.getItem)
router.get('/listas/items',cajeroController.getItems)
router.delete('/:id',cajeroController.setDelete)
export default router;