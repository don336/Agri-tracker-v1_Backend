import { Router, Request, Response } from 'express';
import SalesController from '../../controller/sales';
import checkAuth from '../../middleWare/checkAuth';

const saleRoute: Router = Router();

// Define the route with type-safe handlers
saleRoute.get('/', checkAuth, (req: Request, res: Response) => {
  SalesController.getSales(req, res);
});
saleRoute.get('/:id', checkAuth, (req: Request, res: Response) => {
  SalesController.getSale(req, res);
});
saleRoute.post('/add-sale', checkAuth, (req: Request, res: Response) => {
  SalesController.postSale(req, res);
});
saleRoute.put('/update-sale/:id', checkAuth, (req: Request, res: Response) => {
  SalesController.updateSale(req, res);
});
saleRoute.delete(
  '/delete-sale/:id',
  checkAuth,
  (req: Request, res: Response) => {
    SalesController.deleteSale(req, res);
  }
);

export default saleRoute;
