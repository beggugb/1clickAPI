import { Router } from 'express';
import usuarioController from '../controllers/usuarioController.js';

const router = Router();

router.get('/data/:page/:num/:prop/:value',usuarioController.dataUsuarios)
router.post('/search/lista',usuarioController.searchUsuario)
router.post('/:tipo',usuarioController.saveUsuario)
router.post('/login/usuario',usuarioController.loginUsuario)
router.put('/:id/:tipo',usuarioController.setUpdate)
router.get('/item/:id',usuarioController.getItem)
router.get('/listas/items',usuarioController.getItems)
export default router;