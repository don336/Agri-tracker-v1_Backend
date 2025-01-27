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
      required: [true, 'Crop name is required'],
    },
    variety: {
      type: String,
      required: [true, 'Variety is required'],
    },
    plantingDate: {
      type: Date,
      required: [true, 'Planting date is required'],
    },
    harvestDate: {
      type: Date,
      required: [true, 'Harvest date is required'],
    },
    fieldId: {
      type: Schema.Types.ObjectId,
      ref: 'Field',
      required: false,
    },
    quantity: {
      type: Number,
      required: [true, 'Quantity is required'],
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
