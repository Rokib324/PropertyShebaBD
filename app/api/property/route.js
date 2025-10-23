import connectDB from "@/lib/config/db"
import PropertyModel from "@/lib/models/PropertyModel";
import fs from "fs";
import { writeFile } from "fs/promises";
import { NextResponse } from "next/server";


// Connect to the database
const LoadDB = async () => {
    await connectDB()
}
LoadDB();
// Api endpoint for getting all sliders
async function GET(request) {
    const properties = await PropertyModel.find();
    return NextResponse.json({ success: true, properties: properties });
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

    // Create a new property
    const propertydata = {  
        title: `${formData.get('title')}`,
        description: `${formData.get('description')}`,
        location: `${formData.get('location')}`,
        originalPrice: Number(formData.get('originalPrice')),
        discountedPrice: Number(formData.get('discountedPrice')),
        discount: Number(formData.get('discount')),
        image: `${imgUrl}`,
        type: `${formData.get('type')}`,
        createdAt: new Date(timestamp)  
    }
    await PropertyModel.create(propertydata);
    return NextResponse.json({success: true, message: "Property uploaded successfully!"})
}

// API endpoint to delete a property
async function DELETE(request) {
    const propertyId = await request.nextUrl.searchParams.get('id');
    const property = await PropertyModel.findById(propertyId);
    fs.unlink(`./public/${property.image}`,()=>{});
    await PropertyModel.findByIdAndDelete(propertyId);
    return NextResponse.json({success: true, message: "Property deleted successfully"})
}


export { GET, POST, DELETE };