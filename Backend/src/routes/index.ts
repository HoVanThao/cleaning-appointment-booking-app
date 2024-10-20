import { Router } from 'express';
import authRoute from './auth.route';

const routerAPI: Router = Router();

routerAPI.use('/auth', authRoute);

export default routerAPI;
