import { model, Schema } from 'mongoose';

const cropSchema = new Schema(
  {
    _id: { type: String, required: true },
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
      format: 'YYYY-MM-DD',
      required: true,
    },
    harvestDate: {
      type: Date,
      format: 'YYYY-MM-DD',
      required: true,
    },
    fieldName: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: [0, 'Quantity cannot be negative'],
    },
    area: {
      type: Number,
      required: true,
      min: [0, 'Quantity cannot be negative'],
    },
    status: {
      type: String,
      enum: {
        values: [
          'Planned',
          'Planted',
          'Growing',
          'Ready to Harvest',
          'Harvested',
        ],
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
