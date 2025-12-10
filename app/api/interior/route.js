import connectDB from "@/lib/config/db"
import InterirorModel from "@/lib/models/InterirorModel";
import { writeFile } from "fs/promises";
import { NextResponse } from "next/server";

// Api endpoint for getting all interiors or a specific interior by ID
async function GET(request) {
    try {
        // Ensure database is connected
        await connectDB();
        
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');
        
        if (id) {
            // Get specific interior by ID
            const interior = await InterirorModel.findById(id);
            if (!interior) {
                return NextResponse.json({ success: false, message: "Interior not found" }, { status: 404 });
            }
            return NextResponse.json({ success: true, interior: interior });
        } else {
            // Get all interiors
            const interiors = await InterirorModel.find();
            return NextResponse.json({ success: true, interiors: interiors });
        }
    } catch (error) {
        console.error('Error fetching interiors:', error);
        return NextResponse.json({ 
            success: false, 
            message: error.message || "Error fetching interiors",
            error: process.env.NODE_ENV === 'development' ? error.stack : undefined
        }, { status: 500 });
    }
}

async function POST(request) {
    try {
        // Ensure database is connected
        await connectDB();
        
        const formData = await request.formData();
        const timestamp = Date.now();
        
        // Validate required fields
        const title = formData.get('title');
        const category = formData.get('category');
        const price = formData.get('price');
        const stock = formData.get('stock');
        const image = formData.get('image');
        
        if (!title || !category || !price || !stock || !image) {
            return NextResponse.json({success: false, message: "Missing required fields"}, {status: 400});
        }
        
        // Handle image upload to public folder
        if (image && image.size > 0) {
            const imageByteData = await image.arrayBuffer();
            const buffer = Buffer.from(imageByteData);
            const path = `./public/${timestamp}_${image.name}`;
            await writeFile(path, buffer);
            const imgUrl = `/${timestamp}_${image.name}`;

            // Create a new interior
            const interiordata = {
                title: title,
                description: formData.get('description') || '',
                category: category,
                price: Number(price),
                stock: Number(stock),
                image: imgUrl,
                isAvailable: formData.get('isAvailable') === 'true',
            }
            
            await InterirorModel.create(interiordata);
            console.log("Interior saved");
            return NextResponse.json({success: true, message: "Interior uploaded successfully!"});
        } else {
            return NextResponse.json({success: false, message: "Image is required"}, {status: 400});
        }
        
    } catch (error) {
        console.error('Error creating interior:', error);
        return NextResponse.json({success: false, message: `Error uploading interior item: ${error.message}`}, {status: 500});
    }
}

async function DELETE(request) {
    try {
        // Ensure database is connected
        await connectDB();
        
        const id = request.nextUrl.searchParams.get('id');
        await InterirorModel.findByIdAndDelete(id);
        return NextResponse.json({success: true, message: "Interior deleted successfully!"});
    } catch (error) {
        console.error('Error deleting interior:', error);
        return NextResponse.json({success: false, message: "Error deleting interior item"}, {status: 500});
    }
}


export { GET, POST, DELETE };