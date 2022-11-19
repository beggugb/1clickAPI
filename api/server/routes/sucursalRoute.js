import { Router } from 'express';
import sucursalController from '../controllers/sucursalController.js';

const router = Router();

router.get('/data/:page/:num/:prop/:value',sucursalController.dataSucursales)
router.post('/search/lista',sucursalController.searchSucursal)
router.post('/:tipo',sucursalController.saveSucursal)
router.put('/:id/:tipo',sucursalController.setUpdate)
router.get('/item/:id',sucursalController.getItem)
router.get('/listas/items',sucursalController.getItems)
router.delete('/:id',sucursalController.setDelete)
export default router;