import mongoose from "mongoose";

const sanitarySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    category: {
        type: String,
        enum: ["toilet", "bathroom", "kitchen", "cleaning", "plumbing"],
        required: true,
    },
    brand: {
        type: String,
        required: true,
    },
    material: {
        type: String,
        enum: ["ceramic", "porcelain", "stainless_steel", "plastic", "glass"],
        required: true,
    },
    color: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    originalPrice: {
        type: Number,
        min: 0,
    },
    description: {
        type: String,
        default: "",
    },
    features: [{
        type: String,
    }],
    stock: {
        type: Number,
        default: 0,
        min: 0,
    },
    isAvailable: {
        type: Boolean,
        default: true,
    },
    image: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});

export default mongoose.model("Sanitary", sanitarySchema);