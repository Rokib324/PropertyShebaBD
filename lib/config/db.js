import mongoose from "mongoose";

const connectDB = async () => {
    await mongoose.connect('mongodb+srv://prpertysheba:11JWTm2gll4G1tWZ@cluster0.tpdu0ol.mongodb.net/project-0');
  console.log("Connected to MongoDB");
};

export default connectDB;