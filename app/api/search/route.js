import connectDB from "@/lib/config/db"
import InterirorModel from "@/lib/models/InterirorModel";
import LandModel from "@/lib/models/LandModel";
import MarbleModel from "@/lib/models/MarbleModel";
import SanitaryModel from "@/lib/models/SanitaryModel";
import PropertyModel from "@/lib/models/PropertyModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

// Connect to the database
const LoadDB = async () => {
    try {
        await connectDB();
    } catch (error) {
        console.error('Database connection error:', error);
    }
}
LoadDB();

// Helper function to ensure DB is connected
const ensureDBConnection = async () => {
    if (mongoose.connection.readyState !== 1) {
        await connectDB();
    }
};

// Search API endpoint
async function GET(request) {
    try {
        await ensureDBConnection();
        
        // Get search query from URL parameters
        const { searchParams } = new URL(request.url);
        const query = searchParams.get('q') || '';
        
        if (!query || query.trim().length < 2) {
            return NextResponse.json({ 
                success: true, 
                results: [],
                total: 0,
                message: "Please enter at least 2 characters to search"
            });
        }

        const searchTerm = query.trim().toLowerCase();
        const allResults = [];

        // Search Interior items
        try {
            const interiors = await InterirorModel.find({
                $or: [
                    { title: { $regex: searchTerm, $options: 'i' } },
                    { name: { $regex: searchTerm, $options: 'i' } },
                    { description: { $regex: searchTerm, $options: 'i' } },
                    { category: { $regex: searchTerm, $options: 'i' } }
                ],
                isAvailable: { $ne: false }
            }).limit(10);
            
            interiors.forEach(item => {
                allResults.push({
                    _id: item._id,
                    name: item.title || item.name || 'Interior Item',
                    image: item.image || '/int1.jpg',
                    categoryName: 'Interior',
                    categoryType: item.category || 'interior',
                    source: 'interior',
                    link: `/interior/${item._id}`,
                    price: item.price || null
                });
            });
        } catch (error) {
            console.error('Error searching interiors:', error);
        }

        // Search Land items
        try {
            const lands = await LandModel.find({
                $or: [
                    { title: { $regex: searchTerm, $options: 'i' } },
                    { location: { $regex: searchTerm, $options: 'i' } },
                    { land_type: { $regex: searchTerm, $options: 'i' } },
                    { description: { $regex: searchTerm, $options: 'i' } }
                ],
                is_available: { $ne: false }
            }).limit(10);
            
            lands.forEach(item => {
                allResults.push({
                    _id: item._id,
                    name: item.title || 'Land Property',
                    image: (item.images && item.images.length > 0) ? item.images[0] : '/land1.jpg',
                    categoryName: 'Land',
                    categoryType: item.land_type || 'land',
                    source: 'land',
                    link: `/land/${item._id}`,
                    price: item.price || null
                });
            });
        } catch (error) {
            console.error('Error searching lands:', error);
        }

        // Search Marble items
        try {
            const marbles = await MarbleModel.find({
                $or: [
                    { name: { $regex: searchTerm, $options: 'i' } },
                    { category: { $regex: searchTerm, $options: 'i' } },
                    { color: { $regex: searchTerm, $options: 'i' } },
                    { description: { $regex: searchTerm, $options: 'i' } }
                ],
                isAvailable: { $ne: false }
            }).limit(10);
            
            marbles.forEach(item => {
                allResults.push({
                    _id: item._id,
                    name: item.name || 'Marble Item',
                    image: item.image || '/marbel1.jpg',
                    categoryName: 'Marble',
                    categoryType: item.category || 'marble',
                    source: 'marble',
                    link: `/marble/${item._id}`,
                    price: item.price || null
                });
            });
        } catch (error) {
            console.error('Error searching marbles:', error);
        }

        // Search Sanitary items
        try {
            const sanitaries = await SanitaryModel.find({
                $or: [
                    { name: { $regex: searchTerm, $options: 'i' } },
                    { category: { $regex: searchTerm, $options: 'i' } },
                    { brand: { $regex: searchTerm, $options: 'i' } },
                    { description: { $regex: searchTerm, $options: 'i' } }
                ],
                isAvailable: { $ne: false }
            }).limit(10);
            
            sanitaries.forEach(item => {
                allResults.push({
                    _id: item._id,
                    name: item.name || 'Sanitary Item',
                    image: item.image || '/sanitary1.jpg',
                    categoryName: 'Sanitary',
                    categoryType: item.category || 'sanitary',
                    source: 'sanitary',
                    link: `/sanitary/${item._id}`,
                    price: item.price || null
                });
            });
        } catch (error) {
            console.error('Error searching sanitaries:', error);
        }

        // Search Real Estate/Property items
        try {
            const properties = await PropertyModel.find({
                $or: [
                    { title: { $regex: searchTerm, $options: 'i' } },
                    { type: { $regex: searchTerm, $options: 'i' } },
                    { location: { $regex: searchTerm, $options: 'i' } },
                    { description: { $regex: searchTerm, $options: 'i' } }
                ]
            }).limit(10);
            
            properties.forEach(item => {
                allResults.push({
                    _id: item._id,
                    name: item.title || 'Real Estate Property',
                    image: item.image || '/re1.jpg',
                    categoryName: 'Real Estate',
                    categoryType: item.type || 'property',
                    source: 'property',
                    link: `/realestate/${item._id}`,
                    price: item.discountedPrice || item.originalPrice || null
                });
            });
        } catch (error) {
            console.error('Error searching properties:', error);
        }

        // Remove duplicates based on _id
        const uniqueResults = [];
        const seenIds = new Set();
        
        allResults.forEach(item => {
            const idString = item._id.toString();
            if (!seenIds.has(idString)) {
                seenIds.add(idString);
                uniqueResults.push(item);
            }
        });

        // Limit to 20 results total
        const limitedResults = uniqueResults.slice(0, 20);

        return NextResponse.json({ 
            success: true, 
            results: limitedResults,
            total: limitedResults.length,
            query: query
        });
    } catch (error) {
        console.error('Error searching:', error);
        return NextResponse.json({ 
            success: false, 
            message: error.message || "Error performing search",
            results: [],
            total: 0
        }, { status: 500 });
    }
}

export { GET };

