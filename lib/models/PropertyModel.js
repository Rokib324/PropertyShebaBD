import mongoose from "mongoose";

const propertySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    originalPrice: {
        type: Number,
        required: true
    },
    discountedPrice: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
})

const PropertyModel = mongoose.models.property || mongoose.model("property", propertySchema);

export default PropertyModel;