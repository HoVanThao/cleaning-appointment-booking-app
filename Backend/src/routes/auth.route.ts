import express from 'express';
import { register, login } from '../controllers/auth.controller';
import { registerValidation, loginValidation } from '../dtos/auth.dto';

const router = express.Router();

router.post('/register', registerValidation, register);
router.post('/login', loginValidation, login);

export default router;
