import { Router } from 'express';
import userRoute from './UserRoute';
import cropRoute from './CropRoute';
import saleRoute from './SalesRoute';

const route = Router();
route.use('/auth/', userRoute);
route.use('/crops/', cropRoute);
route.use('/sales/', saleRoute);

export default route;
