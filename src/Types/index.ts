import { JwtPayload } from 'jsonwebtoken';

export interface IUser extends Document {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  dateCreated: Date;
}
