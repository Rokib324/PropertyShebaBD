import connectDB from "@/lib/config/db"
import MarbleModel from "@/lib/models/MarbleModel";
import { writeFile } from "fs/promises";
import { NextResponse } from "next/server";
import mongoose from "mongoose";


// Api endpoint for getting all marbles or a specific marble by ID
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
                    message: "Invalid marble ID format" 
                }, { status: 400 });
            }
            
            // Get specific marble by ID
            const marble = await MarbleModel.findById(id);
            if (!marble) {
                console.log('⚠️ Marble not found:', id);
                return NextResponse.json({ 
                    success: false, 
                    message: "Marble not found" 
                }, { status: 404 });
            }
            
            // Convert to plain object to avoid serialization issues
            const marbleData = marble.toObject ? marble.toObject() : marble;
            
            return NextResponse.json({ 
                success: true, 
                marble: marbleData 
            });
        } else {
            // Get all marbles
            const marbles = await MarbleModel.find();
            // Convert to plain objects
            const marblesData = marbles.map(m => m.toObject ? m.toObject() : m);
            return NextResponse.json({ 
                success: true, 
                marbles: marblesData 
            });
        }
    } catch (error) {
        console.error('❌ Error fetching marbles:', {
            message: error.message,
            name: error.name
        });
        
        if (error.name === 'CastError') {
            return NextResponse.json({ 
                success: false, 
                message: "Invalid marble ID format" 
            }, { status: 400 });
        }
        
        return NextResponse.json({ 
            success: false, 
            message: process.env.NODE_ENV === 'development' 
                ? `Error fetching marbles: ${error.message}`
                : "Error fetching marbles. Please try again later."
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

    // Create a new blog
    const marbledata = {
        name: `${formData.get('name')}`, 
        category: `${formData.get('category')}`,
        color: `${formData.get('color')}`,
        finish: `${formData.get('finish')}`,
        thickness: `${formData.get('thickness')}`,
        size: `${formData.get('size')}`,
        price: `${formData.get('price')}`,
        pricePerSqft: `${formData.get('pricePerSqft')}`,
        description: `${formData.get('description')}`,
        origin: `${formData.get('origin')}`,
        stock: Number(formData.get('stock')),
        image: imgUrl,
        isAvailable: formData.get('isAvailable') === 'true',
        features: formData.get('features') ? formData.get('features').split(',') : [],
        
    }
        await MarbleModel.create(marbledata);
        console.log("Marble saved");
        return NextResponse.json({success: true, message: "Marble uploaded successfully!"});
    } catch (error) {
        console.error('Error creating marble:', error);
        return NextResponse.json({success: false, message: "Error uploading marble"}, {status: 500});
    }
}

async function DELETE(request) {
    try {
        // Ensure database is connected
        await connectDB();
        
        const id = request.nextUrl.searchParams.get('id');
        await MarbleModel.findByIdAndDelete(id);
        return NextResponse.json({success: true, message: "Marble deleted successfully!"});
    } catch (error) {
        console.error('Error deleting marble:', error);
        return NextResponse.json({success: false, message: "Error deleting marble"}, {status: 500});
    }
}


export { GET, POST, DELETE };