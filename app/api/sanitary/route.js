import connectDB from "@/lib/config/db"
import SanitaryModel from "@/lib/models/SanitaryModel";
import { writeFile } from "fs/promises";
import { NextResponse } from "next/server";

// Connect to the database
const LoadDB = async () => {
    await connectDB()
}
LoadDB();
// Api endpoint for getting all marbles
async function GET(request) {
    const sanitary = await SanitaryModel.find();
    return NextResponse.json({ success: true, sanitary: sanitary });
}

async function POST(request) {
    const formData = await request.formData();
    const timestamp = Date.now();
    const image = formData.get('image');
    const imageByteData = await image.arrayBuffer();
    const buffer = Buffer.from(imageByteData);
    const path = `./public/${timestamp}_${image.name}`;
    await writeFile(path,buffer);
    const imgUrl = `/${timestamp}_${image.name}`;

    const sanitarydata = {
        name: `${formData.get('name')}`,
        category: `${formData.get('category')}`,
        brand: `${formData.get('brand')}`,
        material: `${formData.get('material')}`,
        color: `${formData.get('color')}`,
        price: `${formData.get('price')}`,
        originalPrice: `${formData.get('originalPrice')}`,
        description: `${formData.get('description')}`,
        features: `${formData.get('features')}`,
        stock: `${formData.get('stock')}`,
        isAvailable: `${formData.get('isAvailable')}`,
        image: `${imgUrl}`,
    }
    await SanitaryModel.create(sanitarydata);
    return NextResponse.json({ success: true, message: "Sanitary item uploaded successfully!" });
}


async function DELETE(request) {
    const formData = await request.formData();
    const id = formData.get('id');
    await SanitaryModel.findByIdAndDelete(id);
    return NextResponse.json({ success: true, message: "Sanitary item deleted successfully!" });
}   

export { GET, POST, DELETE };