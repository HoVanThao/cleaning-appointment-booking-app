import { Router } from 'express';
import authRoute from './auth.route';
import companyRoute from './company.route';

const routerAPI: Router = Router();

routerAPI.use('/auth', authRoute);
routerAPI.use('/company', companyRoute);

export default routerAPI;
