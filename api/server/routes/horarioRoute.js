import { Router } from 'express';
import horarioController from '../controllers/horarioController.js';

const router = Router();

router.get('/data/:page/:num/:prop/:value',horarioController.dataHorarios)
router.put('/:id/:tipo',horarioController.setUpdate)
export default router;