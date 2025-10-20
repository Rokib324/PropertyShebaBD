import connectDB from "@/lib/config/db"
import SliderModel from "@/lib/models/SliderModel";
import { writeFile } from "fs/promises";
import { NextResponse } from "next/server";


// Connect to the database
const LoadDB = async () => {
    await connectDB()
}
LoadDB();
// Api endpoint for getting all sliders
async function GET(request) {
    return NextResponse.json({ message: "Slider API is working" });
}

async function POST(request) {
    const formData = await request.formData();
    const timestamp = Date.now();
    
    // Handle image upload
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
    console.log("Slider saved")
    return NextResponse.json({success: true, message: "Slider uploaded successfully!"})

}


export { GET, POST };