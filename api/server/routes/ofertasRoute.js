import { Router } from 'express';
import ofertaController from '../controllers/ofertaController.js';

const router = Router();

router.get('/data/:page/:num/:prop/:value',ofertaController.oferts)
router.post('/:tipo',ofertaController.seti)
/*router.get('/item/:id',ofertaController.seti)*/
/*router.post('/search/lista',ofertaController.searchOferta)
router.post('/:tipo',ofertaController.saveOferta)
router.put('/:id/:tipo',ofertaController.setUpdate)
router.get('/lista/items',ofertaController.getItems)
router.delete('/:id',ofertaController.setDelete)*/
export default router;