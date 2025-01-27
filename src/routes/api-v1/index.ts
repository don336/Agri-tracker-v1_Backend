import { Router } from 'express';
import userRoute from './UserRoute';

const route = Router();
route.use('/auth/', userRoute);

export default route;
