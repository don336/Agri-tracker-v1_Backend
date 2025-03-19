import { Router } from 'express';
import userRoute from './UserRoute';
import cropRoute from './CropRoute';

const route = Router();
route.use('/auth/', userRoute);
route.use('/crops/', cropRoute);

export default route;
