import { Router } from 'express';
import * as companyController from '../controllers/company.controller';
import { verifyToken } from '../middleware/auth.middleware';

const router = Router();

router.get('/:id', verifyToken, companyController.getCompanyDetails);

export default router;
