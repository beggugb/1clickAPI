import { Route, Router } from 'express'
import fileController from '../controllers/fileController'

const router = Router()
router.put('/cliente/item/:id',fileController.cliente)
router.put('/portada/item/:id',fileController.portada)
router.put('/sucursal/item/:id',fileController.sucursal)
router.put('/oferta/item/:id',fileController.oferta)

export default router;
