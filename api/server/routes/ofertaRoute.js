import { Router } from 'express';
import ofertaController from '../controllers/ofertaController.js';

const router = Router();

router.get('/data/:page/:num/:prop/:value',ofertaController.dataOfertas)
router.post('/search/lista',ofertaController.searchOferta)
router.post('/:tipo',ofertaController.saveOferta)
router.put('/:id/:tipo',ofertaController.setUpdate)
router.get('/item/:id',ofertaController.getItem)
router.get('/lista/items',ofertaController.getItems)
router.delete('/:id',ofertaController.setDelete)
export default router;