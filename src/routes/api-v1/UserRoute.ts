import { Router, Request, Response } from 'express';
import UserController from '../../controller/user';
import checkAuth from '../../middleWare/checkAuth';
const userRoute: Router = Router();

// Define the route with type-safe handlers
userRoute.post('/signup', (req: Request, res: Response) => {
  UserController.SignUp(req, res);
});
userRoute.post('/signin', (req: Request, res: Response) => {
  UserController.SignIn(req, res);
});

userRoute.get('/profile/:id', checkAuth, (req: Request, res: Response) => {
  UserController.Profile(req, res);
});
userRoute.get('/profiles', checkAuth, (req: Request, res: Response) => {
  UserController.Profiles(req, res);
});

userRoute.put('/update/:id', checkAuth, (req: Request, res: Response) => {
  UserController.UpdateUser(req, res);
});
userRoute.delete('/delete/:id', checkAuth, (req: Request, res: Response) => {
  UserController.DeleteUser(req, res);
});
export default userRoute;
