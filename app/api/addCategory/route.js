import connectDB from "@/lib/config/db"
import AddCategoryModel from "@/lib/models/AddCategoriesModel";
import { writeFile } from "fs/promises";
import { NextResponse } from "next/server";


// Api endpoint for getting all categories
async function GET(request) {
    try {
        // Ensure database is connected
        await connectDB();
        
        const slides = await AddCategoryModel.find();
        return NextResponse.json({ success: true, slides: slides });
    } catch (error) {
        console.error('Error fetching categories:', error);
        return NextResponse.json({ 
            success: false, 
            message: error.message || "Error fetching categories"
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

    // Create a new category
    const addCategorydata = {
        title: `${formData.get('title')}`,
        image: `${imgUrl}`,
        date: `${timestamp}`
    }
        await AddCategoryModel.create(addCategorydata);
        console.log("Category saved");
        return NextResponse.json({success: true, message: "Category uploaded successfully!"});
    } catch (error) {
        console.error('Error creating category:', error);
        return NextResponse.json({success: false, message: "Error uploading category"}, {status: 500});
    }
}

async function DELETE(request) {
    try {
        // Ensure database is connected
        await connectDB();
        
        const id = request.nextUrl.searchParams.get('id');
        await AddCategoryModel.findByIdAndDelete(id);
        return NextResponse.json({success: true, message: "Category deleted successfully!"});
    } catch (error) {
        console.error('Error deleting category:', error);
        return NextResponse.json({success: false, message: "Error deleting category"}, {status: 500});
    }
}


export { GET, POST, DELETE };