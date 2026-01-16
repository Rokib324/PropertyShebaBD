import mongoose from "mongoose";

const AddCategorySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

const AddCategoryModel = mongoose.models.addCategory || mongoose.model("addCategory", AddCategorySchema);

export default AddCategoryModel;