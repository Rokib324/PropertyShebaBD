import connectDB from "@/lib/config/db"
import SanitaryModel from "@/lib/models/SanitaryModel";
import { writeFile } from "fs/promises";
import { NextResponse } from "next/server";

// Connect to the database
const LoadDB = async () => {
    await connectDB()
}
LoadDB();
// Api endpoint for getting all sanitary items or a specific sanitary item by ID
async function GET(request) {
    try {
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