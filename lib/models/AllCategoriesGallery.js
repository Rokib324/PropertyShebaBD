import mongoose from "mongoose";

const allCategoriesGallerySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
});

export default mongoose.models.AllCategoriesGallery || mongoose.model("AllCategoriesGallery", allCategoriesGallerySchema);