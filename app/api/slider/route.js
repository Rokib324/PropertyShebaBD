import connectDB from "@/lib/config/db"
import SliderModel from "@/lib/models/SliderModel";
import { writeFile } from "fs/promises";
import { NextResponse } from "next/server";


// Api endpoint for getting all sliders
async function GET(request) {
    try {
        // Ensure database is connected
        await connectDB();
        
        const slides = await SliderModel.find();
        return NextResponse.json({ success: true, slides: slides });
    } catch (error) {
        console.error('Error fetching sliders:', error);
        return NextResponse.json({ 
            success: false, 
            message: error.message || "Error fetching sliders"
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

    // Create a new blog
    const sliderdata = {
        title: `${formData.get('title')}`,
        description: `${formData.get('description')}`,
        image: `${imgUrl}`,
        date: `${timestamp}`
    }
        await SliderModel.create(sliderdata);
        console.log("Slider saved");
        return NextResponse.json({success: true, message: "Slider uploaded successfully!"});
    } catch (error) {
        console.error('Error creating slider:', error);
        return NextResponse.json({success: false, message: "Error uploading slider"}, {status: 500});
    }
}

async function DELETE(request) {
    try {
        // Ensure database is connected
        await connectDB();
        
        const id = request.nextUrl.searchParams.get('id');
        await SliderModel.findByIdAndDelete(id);
        return NextResponse.json({success: true, message: "Slider deleted successfully!"});
    } catch (error) {
        console.error('Error deleting slider:', error);
        return NextResponse.json({success: false, message: "Error deleting slider"}, {status: 500});
    }
}


export { GET, POST, DELETE };