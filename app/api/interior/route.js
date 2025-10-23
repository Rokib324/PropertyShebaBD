import connectDB from "@/lib/config/db"
import InterirorModel from "@/lib/models/InterirorModel";
import { writeFile } from "fs/promises";
import { NextResponse } from "next/server";


// Connect to the database
const LoadDB = async () => {
    await connectDB()
}
LoadDB();
// Api endpoint for getting all interiors
async function GET(request) {
    const interiors = await InterirorModel.find();
    return NextResponse.json({ success: true, interiors: interiors });  
}

async function POST(request) {
    const formData = await request.formData();
    const timestamp = Date.now();
    
    // Handle image upload to public folder
    const image = formData.get('image');
    const imageByteData = await image.arrayBuffer();
    const buffer = Buffer.from(imageByteData);
    const path = `./public/${timestamp}_${image.name}`;
    await writeFile(path,buffer);
    const imgUrl = `/${timestamp}_${image.name}`;

    // Create a new interior
    const interiordata = {
        title: `${formData.get('title')}`,
        description: `${formData.get('description')}`,
        category: `${formData.get('category')}`,
        price: Number(formData.get('price')),
        stock: Number(formData.get('stock')),
        image: `${imgUrl}`,
        isAvailable: `${formData.get('isAvailable')}`,
    }
    await InterirorModel.create(interiordata);
    console.log("Interior saved")
    return NextResponse.json({success: true, message: "Interior uploaded successfully!"})

}

async function DELETE(request) {
    const id = request.nextUrl.searchParams.get('id');
    await InteriorModel.findByIdAndDelete(id);
    return NextResponse.json({success: true, message: "Interior deleted successfully!"})
}


export { GET, POST, DELETE };