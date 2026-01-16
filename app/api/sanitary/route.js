import connectDB from "@/lib/config/db"
import SanitaryModel from "@/lib/models/SanitaryModel";
import { writeFile } from "fs/promises";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

// Api endpoint for getting all sanitary items or a specific sanitary item by ID
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
                    message: "Invalid sanitary ID format" 
                }, { status: 400 });
            }
            
            // Get specific sanitary item by ID
            const sanitary = await SanitaryModel.findById(id);
            if (!sanitary) {
                console.log('⚠️ Sanitary item not found:', id);
                return NextResponse.json({ 
                    success: false, 
                    message: "Sanitary item not found" 
                }, { status: 404 });
            }
            
            // Convert to plain object to avoid serialization issues
            const sanitaryData = sanitary.toObject ? sanitary.toObject() : sanitary;
            
            return NextResponse.json({ 
                success: true, 
                sanitary: sanitaryData 
            });
        } else {
            // Get all sanitary items
            const sanitary = await SanitaryModel.find();
            // Convert to plain objects
            const sanitaryData = sanitary.map(s => s.toObject ? s.toObject() : s);
            return NextResponse.json({ 
                success: true, 
                sanitary: sanitaryData 
            });
        }
    } catch (error) {
        console.error('❌ Error fetching sanitary items:', {
            message: error.message,
            name: error.name
        });
        
        if (error.name === 'CastError') {
            return NextResponse.json({ 
                success: false, 
                message: "Invalid sanitary ID format" 
            }, { status: 400 });
        }
        
        return NextResponse.json({ 
            success: false, 
            message: process.env.NODE_ENV === 'development' 
                ? `Error fetching sanitary items: ${error.message}`
                : "Error fetching sanitary items. Please try again later."
        }, { status: 500 });
    }
}

async function POST(request) {
    try {
        // Ensure database is connected
        await connectDB();
        
        const formData = await request.formData();
    const timestamp = Date.now();
    const image = formData.get('image');
    const imageByteData = await image.arrayBuffer();
    const buffer = Buffer.from(imageByteData);
    const path = `./uploads/${timestamp}_${image.name}`;
    await writeFile(path,buffer);
    const imgUrl = `/api/uploads/${timestamp}_${image.name}`;

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
    } catch (error) {
        console.error('Error creating sanitary item:', error);
        return NextResponse.json({success: false, message: "Error uploading sanitary item"}, {status: 500});
    }
}


async function DELETE(request) {
    try {
        // Ensure database is connected
        await connectDB();
        
        const id = request.nextUrl.searchParams.get('id');
        await SanitaryModel.findByIdAndDelete(id);
        return NextResponse.json({ success: true, message: "Sanitary item deleted successfully!" });
    } catch (error) {
        console.error('Error deleting sanitary item:', error);
        return NextResponse.json({success: false, message: "Error deleting sanitary item"}, {status: 500});
    }
}   

export { GET, POST, DELETE };