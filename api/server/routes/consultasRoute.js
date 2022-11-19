import { Router } from 'express';
import clienteController from '../controllers/clienteController.js';
import cajeroController from '../controllers/cajeroController.js';

const router = Router();

router.get('/data/:page/:num/:ciudad/:prop/:latitude/:longitude',clienteController.consulta)
router.get('/item/:id',clienteController.getDetalle)
router.post('/search/lista', clienteController.getSearch);
router.get('/lista/items',clienteController.cajeros)
router.get('/lista/cajeros/items/:id',cajeroController.listaCajeros)

export default router;
