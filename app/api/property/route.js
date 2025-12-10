import connectDB from "@/lib/config/db"
import PropertyModel from "@/lib/models/PropertyModel";
import fs from "fs";
import { writeFile } from "fs/promises";
import { NextResponse } from "next/server";


// Api endpoint for getting all properties or a specific property by ID
async function GET(request) {
    try {
        // Ensure database is connected
        await connectDB();
        
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');
        
        if (id) {
            // Get specific property by ID
            const property = await PropertyModel.findById(id);
            if (!property) {
                return NextResponse.json({ success: false, message: "Property not found" }, { status: 404 });
            }
            return NextResponse.json({ success: true, property: property });
        } else {
            // Get all properties
            const properties = await PropertyModel.find();
            return NextResponse.json({ success: true, properties: properties });
        }
    } catch (error) {
        console.error('Error fetching properties:', error);
        return NextResponse.json({ 
            success: false, 
            message: error.message || "Error fetching properties"
        }, { status: 500 });
    }
}

async function POST(request) {
    try {
        // Ensure database is connected
        await connectDB();
        
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
        return NextResponse.json({success: true, message: "Property uploaded successfully!"});
    } catch (error) {
        console.error('Error creating property:', error);
        return NextResponse.json({success: false, message: "Error uploading property"}, {status: 500});
    }
}

// API endpoint to delete a property
async function DELETE(request) {
    try {
        // Ensure database is connected
        await connectDB();
        
        const propertyId = await request.nextUrl.searchParams.get('id');
        const property = await PropertyModel.findById(propertyId);
        if (property && property.image) {
            fs.unlink(`./public/${property.image}`,()=>{});
        }
        await PropertyModel.findByIdAndDelete(propertyId);
        return NextResponse.json({success: true, message: "Property deleted successfully"});
    } catch (error) {
        console.error('Error deleting property:', error);
        return NextResponse.json({success: false, message: "Error deleting property"}, {status: 500});
    }
}


export { GET, POST, DELETE };