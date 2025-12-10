import connectDB from "@/lib/config/db"
import InterirorModel from "@/lib/models/InterirorModel";
import LandModel from "@/lib/models/LandModel";
import MarbleModel from "@/lib/models/MarbleModel";
import SanitaryModel from "@/lib/models/SanitaryModel";
import PropertyModel from "@/lib/models/PropertyModel";
import { NextResponse } from "next/server";

// Helper function to ensure DB is connected
const ensureDBConnection = async () => {
    await connectDB();
};

// Api endpoint for getting all categories gallery or a specific category by ID
async function GET(request) {
    try {
        // Ensure database is connected
        await ensureDBConnection();
        
        // Aggregate items from all categories automatically
        const allItems = [];
        
        // Fetch Interior items (show all, not just available ones)
        try {
            const allInteriors = await InterirorModel.find();
            const availableInteriors = allInteriors.filter(item => item.isAvailable !== false);
            console.log(`Fetched ${availableInteriors.length} interior items (out of ${allInteriors.length} total)`);
            availableInteriors.forEach(item => {
                allItems.push({
                    _id: item._id,
                    name: item.title || item.name || 'Interior Item',
                    image: item.image || '/int1.jpg',
                    categoryName: 'Interior',
                    categoryType: item.category || 'interior',
                    source: 'interior'
                });
            });
        } catch (error) {
            console.error('Error fetching interiors:', error);
        }
        
        // Fetch Land items (show all, not just available ones)
        try {
            const allLands = await LandModel.find();
            const availableLands = allLands.filter(item => item.is_available !== false);
            console.log(`Fetched ${availableLands.length} land items (out of ${allLands.length} total)`);
            availableLands.forEach(item => {
                allItems.push({
                    _id: item._id,
                    name: item.title || 'Land Property',
                    image: (item.images && item.images.length > 0) ? item.images[0] : '/land1.jpg',
                    categoryName: 'Land',
                    categoryType: item.land_type || 'land',
                    source: 'land'
                });
            });
        } catch (error) {
            console.error('Error fetching lands:', error);
        }
        
        // Fetch Marble items (show all, not just available ones)
        try {
            const allMarbles = await MarbleModel.find();
            const availableMarbles = allMarbles.filter(item => item.isAvailable !== false);
            console.log(`Fetched ${availableMarbles.length} marble items (out of ${allMarbles.length} total)`);
            availableMarbles.forEach(item => {
                allItems.push({
                    _id: item._id,
                    name: item.name || 'Marble Item',
                    image: item.image || '/marbel1.jpg',
                    categoryName: 'Marble',
                    categoryType: item.category || 'marble',
                    source: 'marble'
                });
            });
        } catch (error) {
            console.error('Error fetching marbles:', error);
        }
        
        // Fetch Sanitary items (show all, not just available ones)
        try {
            const allSanitaries = await SanitaryModel.find();
            const availableSanitaries = allSanitaries.filter(item => item.isAvailable !== false);
            console.log(`Fetched ${availableSanitaries.length} sanitary items (out of ${allSanitaries.length} total)`);
            availableSanitaries.forEach(item => {
                allItems.push({
                    _id: item._id,
                    name: item.name || 'Sanitary Item',
                    image: item.image || '/sanitary1.jpg',
                    categoryName: 'Sanitary',
                    categoryType: item.category || 'sanitary',
                    source: 'sanitary'
                });
            });
        } catch (error) {
            console.error('Error fetching sanitaries:', error);
        }
        
        // Fetch Real Estate/Property items (show all)
        try {
            const properties = await PropertyModel.find();
            console.log(`Fetched ${properties.length} property items`);
            properties.forEach(item => {
                allItems.push({
                    _id: item._id,
                    name: item.title || 'Real Estate Property',
                    image: item.image || '/re1.jpg',
                    categoryName: 'Real Estate',
                    categoryType: item.type || 'property',
                    source: 'property'
                });
            });
        } catch (error) {
            console.error('Error fetching properties:', error);
        }
        
        console.log(`Total items aggregated: ${allItems.length}`);
        
        // Remove duplicates based on _id (in case same item appears in multiple categories)
        const uniqueItems = [];
        const seenIds = new Set();
        
        allItems.forEach(item => {
            const idString = item._id.toString();
            if (!seenIds.has(idString)) {
                seenIds.add(idString);
                uniqueItems.push(item);
            }
        });
        
        console.log(`After removing duplicates: ${uniqueItems.length} unique items`);
        
        // Shuffle items for variety (optional)
        const shuffledItems = uniqueItems.sort(() => Math.random() - 0.5);
        
        return NextResponse.json({ 
            success: true, 
            categories: shuffledItems,
            total: shuffledItems.length
        });
    } catch (error) {
        console.error('Error fetching categories:', error);
        return NextResponse.json({ 
            success: false, 
            message: error.message || "Error fetching categories",
            error: process.env.NODE_ENV === 'development' ? error.stack : undefined
        }, { status: 500 });
    }
}

export { GET };

