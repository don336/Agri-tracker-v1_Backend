import { Router, Request, Response } from 'express';
import UserController from '../../controller/user';

const userRoute: Router = Router();

// Define the route with type-safe handlers
userRoute.post('/signup', (req: Request, res: Response) => {
  UserController.SignUp(req, res);
});
userRoute.post('/signin', (req: Request, res: Response) => {
  UserController.SignIn(req, res);
});

export default userRoute;
