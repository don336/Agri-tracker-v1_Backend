import { model, Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';
const userSchema = new Schema({
  userId: {
    type: String,
    default: uuidv4,
  },
  name: {
    type: String,
    required: true,
  },

  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    index: true,
    unique: true,
    sparse: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: 'user',
    enum: ['admin', 'user'],
  },

  dateCreated: {
    type: Date,
    default: Date.now,
    immutable: true,
  },
});

export default model('User', userSchema);
