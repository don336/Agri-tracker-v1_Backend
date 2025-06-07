import { model, Schema } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const fieldSchema = new Schema({
  fieldId: {
    type: String,
    default: uuidv4,
  },

  name: {
    type: String,
    required: true,
  },

  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true,
    },
    coordinates: {
      type: [Number], // Array of numbers [longitude, latitude]
      required: true,
    },
  },

  size: {
    type: Number,
    required: true, // Field size is required
  },

  soil_type: {
    type: String,
    required: true, // Soil type is required
  },

  current_crop: {
    type: Schema.Types.ObjectId,
    ref: 'Crop', // References the Crop model
  },

  history: [
    {
      crop: { type: Schema.Types.ObjectId, ref: 'Crop' },
    },
  ],

  notes: {
    type: String, // Optional notes
  },
});

// Add an index for geospatial queries
fieldSchema.index({ location: '2dsphere' });

export default model('Field', fieldSchema);
