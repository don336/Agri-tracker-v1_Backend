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
  const token = req.cookies['token'] || req.headers['authorization'];

  // console.log(token, 'token ====================>');

  if (!token) {
    res.status(401).json({ msg: 'Auth Denied!' });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || ''
    ) as JwtPayload;
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({
      message:
        error instanceof Error ? error.message : 'Authentication failed!',
    });
  }
};

export default checkAuth;
