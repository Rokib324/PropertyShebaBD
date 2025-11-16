import connectDB from "@/lib/config/db"
import MarbleModel from "@/lib/models/MarbleModel";
import { writeFile } from "fs/promises";
import { NextResponse } from "next/server";


// Connect to the database
const LoadDB = async () => {
    await connectDB()
}
LoadDB();
// Api endpoint for getting all marbles or a specific marble by ID
async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');
        
        if (id) {
            // Get specific marble by ID
            const marble = await MarbleModel.findById(id);
            if (!marble) {
                return NextResponse.json({ success: false, message: "Marble not found" }, { status: 404 });
            }
            return NextResponse.json({ success: true, marble: marble });
        } else {
            // Get all marbles
            const marbles = await MarbleModel.find();
            return NextResponse.json({ success: true, marbles: marbles });
        }
    } catch (error) {
        console.error('Error fetching marbles:', error);
        return NextResponse.json({ 
            success: false, 
            message: error.message || "Error fetching marbles"
        }, { status: 500 });
    }
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
    console.log("Marble saved")
    return NextResponse.json({success: true, message: "Marble uploaded successfully!"})

}

async function DELETE(request) {
    const id = request.nextUrl.searchParams.get('id');
    await MarbleModel.findByIdAndDelete(id);
    return NextResponse.json({success: true, message: "Marble deleted successfully!"})
}


export { GET, POST, DELETE };