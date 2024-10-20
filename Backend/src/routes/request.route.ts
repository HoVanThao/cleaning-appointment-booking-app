import { Router } from 'express';
import { RequestController } from '../controllers/request.controller';
import { validateRequest } from '../middleware/request.middleware';
import { validateUpdateRequest } from '../middleware/request.middleware';

const router = Router();
const requestController = new RequestController();

router.post(
  '/',
  validateRequest,
  requestController.create.bind(requestController)
);
router.get('/', requestController.getAll.bind(requestController));
router.get('/:id', requestController.getById.bind(requestController));
router.put(
  '/:id',
  validateUpdateRequest,
  requestController.update.bind(requestController)
);
router.delete('/:id', requestController.delete.bind(requestController));

export default router;
