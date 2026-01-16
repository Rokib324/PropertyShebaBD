
import connectDB from "@/lib/config/db"
import LandModel from "@/lib/models/LandModel";
import fs from "fs";
import { writeFile } from "fs/promises";
import { NextResponse } from "next/server";
import mongoose from "mongoose";


// Api endpoint for getting all lands or a specific land by ID
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
                    message: "Invalid land ID format" 
                }, { status: 400 });
            }
            
            // Get specific land by ID
            const land = await LandModel.findById(id);
            if (!land) {
                console.log('⚠️ Land not found:', id);
                return NextResponse.json({ 
                    success: false, 
                    message: "Land not found" 
                }, { status: 404 });
            }
            
            // Convert to plain object to avoid serialization issues
            const landData = land.toObject ? land.toObject() : land;
            
            return NextResponse.json({ 
                success: true, 
                land: landData 
            });
        } else {
            // Get all lands
            const lands = await LandModel.find();
            // Convert to plain objects
            const landsData = lands.map(l => l.toObject ? l.toObject() : l);
            return NextResponse.json({ 
                success: true, 
                lands: landsData 
            });
        }
    } catch (error) {
        console.error('❌ Error fetching lands:', {
            message: error.message,
            name: error.name
        });
        
        if (error.name === 'CastError') {
            return NextResponse.json({ 
                success: false, 
                message: "Invalid land ID format" 
            }, { status: 400 });
        }
        
        return NextResponse.json({ 
            success: false, 
            message: process.env.NODE_ENV === 'development' 
                ? `Error fetching lands: ${error.message}`
                : "Error fetching lands. Please try again later."
        }, { status: 500 });
    }
}

async function POST(request) {
    try {
        // Ensure database is connected
        await connectDB();
        
        const formData = await request.formData();
        const timestamp = Date.now();
        
        // Handle multiple image uploads
        const images = formData.getAll('images');
        const imageUrls = [];
        
        for (let i = 0; i < images.length; i++) {
            const image = images[i];
            if (image && image.size > 0) {
                const imageByteData = await image.arrayBuffer();
                const buffer = Buffer.from(imageByteData);
                const path = `./uploads/${timestamp}_${i}_${image.name}`;
                await writeFile(path, buffer);
                imageUrls.push(`/api/uploads/${timestamp}_${i}_${image.name}`);
            }
        }

        // Create a new land property
        const landdata = {  
            title: formData.get('title'),
            description: formData.get('description'),
            land_type: formData.get('land_type'),
            address: formData.get('address'),
            city: formData.get('city'),
            district: formData.get('district'),
            country: formData.get('country'),
            area_size: Number(formData.get('area_size')),
            price: Number(formData.get('price')),
            price_per_unit: formData.get('price_per_unit') ? Number(formData.get('price_per_unit')) : null,
            ownership_type: formData.get('ownership_type'),
            utilities_available: formData.get('utilities_available') === 'true',
            images: imageUrls,
            is_featured: formData.get('is_featured') === 'true',
            is_available: formData.get('is_available') === 'true',
            contact_info: {
                name: formData.get('contact_name'),
                phone: formData.get('contact_phone'),
                email: formData.get('contact_email'),
            },
            created_at: new Date(timestamp)  
        }
        
        await LandModel.create(landdata);
        return NextResponse.json({success: true, message: "Land uploaded successfully!"})
        
    } catch (error) {
        console.error('Error creating land:', error);
        return NextResponse.json({success: false, message: "Error uploading land details"}, {status: 500});
    }
}

// API endpoint to delete a land
async function DELETE(request) {
    try {
        // Ensure database is connected
        await connectDB();
        
        const landId = await request.nextUrl.searchParams.get('id');
        const land = await LandModel.findById(landId);
        if (land && land.images && land.images.length > 0) {
            // Delete all images associated with this land
            land.images.forEach(imageUrl => {
                const filename = imageUrl.replace('/api/uploads/', '');
                fs.unlink(`./uploads/${filename}`,()=>{});
            });
        }
        await LandModel.findByIdAndDelete(landId);
        return NextResponse.json({success: true, message: "Land deleted successfully"});
    } catch (error) {
        console.error('Error deleting land:', error);
        return NextResponse.json({success: false, message: "Error deleting land"}, {status: 500});
    }
}


export { GET, POST, DELETE };