import { model, Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
import { IUser } from '../Types/index';
const userSchema = new Schema<IUser>({
  userId: {
    type: String,
    default: uuidv4,
    immutable: true, // Ensures it cannot be modified after creation
  },
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true, // Ensures emails are stored in lowercase
    trim: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'], // Basic email validation
  },
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    unique: true, // Ensures no duplicate phone numbers
    trim: true,
    match: [/^\+?\d{10,15}$/, 'Please enter a valid phone number'], // Validates phone format
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  dateCreated: {
    type: Date,
    default: Date.now,
    immutable: true, // Ensures it cannot be modified
  },
});

export default model<IUser>('User', userSchema);
