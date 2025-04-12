import { model, Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const salesSchema = new Schema({
  _id: {
    type: String,
    default: uuidv4,
    required: true,
  },

  crop_name: {
    type: String,
    required: true,
  },

  customer_name: {
    type: String,
    required: true,
  },
  customer_contact: {
    type: String,
    required: true,
  },

  quantity: {
    type: Number,
    required: true,
    min: 0,
  },

  unit_price: {
    type: Number,
    required: true,
    min: 0,
  },

  total_price: {
    type: Number,
    required: true,
    min: 0,
  },

  sale_date: {
    type: Date,
    required: true,
    trim: true,
  },

  payment_method: {
    type: String,
    trim: true,
  },
  notes: {
    type: String,
    trim: true,
  },
});

// Virtual field to auto-calculate `totalRevenue` if not provided
salesSchema.pre('save', function (next) {
  if (!this.total_price) {
    this.total_price = this.quantity * this.unit_price;
  }
  next();
});

export default model('Sale', salesSchema);
