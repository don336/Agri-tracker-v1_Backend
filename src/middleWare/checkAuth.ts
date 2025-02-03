import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { IUser } from '../Types';

export interface AuthRequest extends Request {
  user?: JwtPayload | IUser;
}
const checkAuth = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(' ')[1] || '';

  if (!token) {
    res.status(401).json({ message: 'Authentication failed!' });
  }

  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
      throw new Error('JWT_SECRET is not defined');
    }

    const decodedToken = jwt.verify(token, secret) as JwtPayload;
    req.user = decodedToken;
    next();
  } catch (error) {
    if (error instanceof Error) {
      res.status(401).json({ message: error.message });
    }
    res.status(401).json({ message: 'Authentication failed!' });
  }
};

export default checkAuth;
