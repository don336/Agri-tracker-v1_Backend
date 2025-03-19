import { Router, Request, Response } from 'express';
import CropController from '../../controller/crop';
import checkAuth from '../../middleWare/checkAuth';

const cropRoute: Router = Router();

// Define the route with type-safe handlers
cropRoute.get('/', checkAuth, (req: Request, res: Response) => {
  CropController.getCrops(req, res);
});
cropRoute.post('/add-crop', checkAuth, (req: Request, res: Response) => {
  CropController.createCrop(req, res);
});
cropRoute.get('/update-crop', checkAuth, (req: Request, res: Response) => {
  CropController.updateCrop(req, res);
});
cropRoute.get('/delete-crop', checkAuth, (req: Request, res: Response) => {
  CropController.deleteCrop(req, res);
});

export default cropRoute;
