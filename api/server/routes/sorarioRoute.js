import { Router } from 'express';
import sorarioController from '../controllers/sorarioController.js';

const router = Router();

router.get('/data/:page/:num/:prop/:value',sorarioController.dataSorarios)
router.put('/:id/:tipo',sorarioController.setUpdate)
export default router;