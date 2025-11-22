import mongoose from "mongoose";

const specialOffersModel = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
});

export default mongoose.models.SpecialOffersModel || mongoose.model("SpecialOffersModel", specialOffersModel);