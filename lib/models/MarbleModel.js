import mongoose from "mongoose";

const marbleSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      enum: ["granite", "marble", "quartz", "onyx", "travertine", "limestone"],
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    finish: {
      type: String,
      enum: ["polished", "honed", "leathered", "brushed", "antique"],
      required: true,
    },
    thickness: {
      type: String, // e.g., "2cm", "3cm"
      required: true,
    },
    size: {
      type: String, // e.g., "60x60", "30x60", "custom"
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    pricePerSqft: {
      type: Number,
      required: true,
      min: 0,
    },
    description: {
      type: String,
      default: "",
      trim: true,
    },
    origin: {
      type: String, // Country of origin
      required: true,
    },
    stock: {
      type: Number,
      default: 0,
      min: 0,
    },
    image: {
      type: String,
      required: true
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    features: [{
      type: String, // e.g., "water resistant", "heat resistant"
    }],
  }, {
    timestamps: true,
  });
  
  export default mongoose.model("Marble", marbleSchema);