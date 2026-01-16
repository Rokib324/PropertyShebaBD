import connectDB from "@/lib/config/db"
import PropertyModel from "@/lib/models/PropertyModel";
import fs from "fs";
import { writeFile } from "fs/promises";
import { NextResponse } from "next/server";
import mongoose from "mongoose";


// Api endpoint for getting all properties or a specific property by ID
async function GET(request) {
    try {
        // Ensure database is connected
        await connectDB();
        
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');
        
        if (id) {
            // Validate ObjectId format
            if (!mongoose.Types.ObjectId.isValid(id)) {
                console.error('❌ Invalid ObjectId format:', id);
                return NextResponse.json({ 
                    success: false, 
                    message: "Invalid property ID format" 
                }, { status: 400 });
            }
            
            // Get specific property by ID
            const property = await PropertyModel.findById(id);
            if (!property) {
                console.log('⚠️ Property not found:', id);
                return NextResponse.json({ 
                    success: false, 
                    message: "Property not found" 
                }, { status: 404 });
            }
            
            // Convert to plain object to avoid serialization issues
            const propertyData = property.toObject ? property.toObject() : property;
            
            return NextResponse.json({ 
                success: true, 
                property: propertyData 
            });
        } else {
            // Get all properties
            const properties = await PropertyModel.find();
            // Convert to plain objects
            const propertiesData = properties.map(p => p.toObject ? p.toObject() : p);
            return NextResponse.json({ 
                success: true, 
                properties: propertiesData 
            });
        }
    } catch (error) {
        // Log detailed error for debugging
        console.error('❌ Error fetching properties:', {
            message: error.message,
            name: error.name,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
        });
        
        // Handle specific error types
        if (error.name === 'CastError') {
            return NextResponse.json({ 
                success: false, 
                message: "Invalid property ID format" 
            }, { status: 400 });
        }
        
        if (error.message.includes('MONGODB_URI') || error.message.includes('connection')) {
            console.error('❌ Database connection error');
            return NextResponse.json({ 
                success: false, 
                message: "Database connection error. Please check server configuration." 
            }, { status: 500 });
        }
        
        // Return user-friendly error message
        return NextResponse.json({ 
            success: false, 
            message: process.env.NODE_ENV === 'development' 
                ? `Error fetching properties: ${error.message}`
                : "Error fetching properties. Please try again later."
        }, { status: 500 });
    }
}

async function POST(request) {
    try {
        // Ensure database is connected
        await connectDB();
        
        const formData = await request.formData();
    const timestamp = Date.now();
    
    // Handle image upload to uploads folder
    const image = formData.get('image');
    const imageByteData = await image.arrayBuffer();
    const buffer = Buffer.from(imageByteData);
    const path = `./uploads/${timestamp}_${image.name}`;
    await writeFile(path,buffer);
    const imgUrl = `/api/uploads/${timestamp}_${image.name}`;

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
            // Extract filename from /api/uploads/filename format
            const filename = property.image.replace('/api/uploads/', '');
            fs.unlink(`./uploads/${filename}`,()=>{});
        }
        await PropertyModel.findByIdAndDelete(propertyId);
        return NextResponse.json({success: true, message: "Property deleted successfully"});
    } catch (error) {
        console.error('Error deleting property:', error);
        return NextResponse.json({success: false, message: "Error deleting property"}, {status: 500});
    }
}


export { GET, POST, DELETE };