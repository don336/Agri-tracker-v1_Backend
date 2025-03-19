import { model, Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const cropSchema = new Schema(
  {
    cropId: {
      type: String,
      default: uuidv4,
    },
    name: {
      type: String,
      required: true,
    },
    variety: {
      type: String,
      required: true,
    },
    plantingDate: {
      type: Date,
      required: true,
    },
    harvestDate: {
      type: Date,
      required: true,
    },
    fieldId: {
      type: Schema.Types.ObjectId,
      ref: 'Field',
      required: false,
    },
    quantity: {
      type: Number,
      required: true,
      min: [0, 'Quantity cannot be negative'],
    },
    status: {
      type: String,
      enum: {
        values: ['growing', 'harvested'],
        message: 'Status must be either "growing" or "harvested"',
      },
      default: 'growing',
    },
    notes: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

export default model('Crop', cropSchema);
