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
  fieldName: string;
  area: number;
}

export interface ISales extends Document {
  crop_name: string;
  customer_name: string;
  customer_contact: string;
  quantity: number; // in kg
  unit_price: number; // per kg
  total_price: number;
  sale_date: string;
  payment_method: string;
  notes: string;
}
