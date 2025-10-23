import mongoose from "mongoose";

const LAND_TYPES = [
  'residential',
  'commercial',
  'agricultural',
  'industrial',
  'mixed_use',
  'recreational'
];

const landSchema = new mongoose.Schema({
  // Basic Info
  title: {
    type: String,
    required: true,
    maxlength: 200
  },
  description: {
    type: String,
    required: false
  },
  land_type: {
    type: String,
    enum: LAND_TYPES,
    default: 'residential'
  },

  // Location Info
  address: {
    type: String,
    required: true,
    maxlength: 255
  },
  city: {
    type: String,
    required: true,
    maxlength: 100
  },
  district: {
    type: String,
    required: false,
    maxlength: 100
  },
  country: {
    type: String,
    default: 'Bangladesh',
    maxlength: 100
  },

  // Property Details
  area_size: {
    type: Number,
    required: true,
    min: 0
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  price_per_unit: {
    type: Number,
    required: false,
    min: 0
  },
  ownership_type: {
    type: String,
    enum: ['freehold', 'leasehold'],
    default: 'freehold'
  },
  utilities_available: {
    type: Boolean,
    default: false
  },

  // Additional fields for better functionality
  images: [{
    type: String,
    required: false
  }],
  is_featured: {
    type: Boolean,
    default: false
  },
  is_available: {
    type: Boolean,
    default: true
  },
  contact_info: {
    name: String,
    phone: String,
    email: String
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
});

// Update the updated_at field before saving
landSchema.pre('save', function(next) {
  this.updated_at = Date.now();
  next();
});

const LandModel = mongoose.models.land || mongoose.model("land", landSchema);

export default LandModel;
