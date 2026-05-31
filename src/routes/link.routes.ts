import { Router, type IRouter } from 'express';
import {
  crearEnlaceHandler,
  redireccionarHandler,
  listarHistorialHandler,
} from '../controllers/link.controller';

const router: IRouter = Router();

router.post('/api/enlaces', crearEnlaceHandler);
router.get('/api/enlaces', listarHistorialHandler);
router.get('/:codigo', redireccionarHandler);

export default router;
