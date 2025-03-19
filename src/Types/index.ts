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

export interface ICrop extends Document {
  name: string;
  variety: string;
  plantingDate: Date;
  harvestDate: Date;
  quantity: number;
  status: string;
  notes: string;
}
