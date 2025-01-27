import { model, Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const salesSchema = new Schema({
  saleId: {
    type: String,
    default: uuidv4,
  },

  crop: {
    type: Schema.Types.ObjectId,
    ref: 'Crop',
    required: true,
  },

  saleDate: {
    type: Date,
    default: Date.now,
  },

  quantity: {
    type: Number,
    required: true,
    min: 0,
  },

  pricePerUnit: {
    type: Number,
    required: true,
    min: 0,
  },

  totalRevenue: {
    type: Number,
    required: true,
    min: 0,
  },

  buyer: {
    type: String,
    required: true,
    trim: true,
  },

  notes: {
    type: String,
    trim: true,
  },
});

// Virtual field to auto-calculate `totalRevenue` if not provided
salesSchema.pre('save', function (next) {
  if (!this.totalRevenue) {
    this.totalRevenue = this.quantity * this.pricePerUnit;
  }
  next();
});

export default model('Sale', salesSchema);
