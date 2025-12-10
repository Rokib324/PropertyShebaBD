import connectDB from "@/lib/config/db"
import SanitaryModel from "@/lib/models/SanitaryModel";
import { writeFile } from "fs/promises";
import { NextResponse } from "next/server";

// Api endpoint for getting all sanitary items or a specific sanitary item by ID
async function GET(request) {
    try {
        // Ensure database is connected
        await connectDB();
        
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');
        
        if (id) {
            // Get specific sanitary item by ID
            const sanitary = await SanitaryModel.findById(id);
            if (!sanitary) {
                return NextResponse.json({ success: false, message: "Sanitary item not found" }, { status: 404 });
            }
            return NextResponse.json({ success: true, sanitary: sanitary });
        } else {
            // Get all sanitary items
            const sanitary = await SanitaryModel.find();
            return NextResponse.json({ success: true, sanitary: sanitary });
        }
    } catch (error) {
        console.error('Error fetching sanitary items:', error);
        return NextResponse.json({ 
            success: false, 
            message: error.message || "Error fetching sanitary items"
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