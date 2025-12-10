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

// Calculate discount percentage
const calculateDiscount = (originalPrice, discountedPrice) => {
    if (!originalPrice || !discountedPrice || originalPrice <= discountedPrice) {
        return 0;
    }
    return Math.round(((originalPrice - discountedPrice) / originalPrice) * 100);
};

// Api endpoint for getting all discounted items from all categories
async function GET(request) {
    try {
        // Ensure database is connected
        await ensureDBConnection();
        
        const allDiscountedItems = [];
        
        // Fetch Property items (they have discount fields)
        try {
            const properties = await PropertyModel.find();
            properties.forEach(item => {
                if (item.discount > 0 && item.originalPrice > item.discountedPrice) {
                    allDiscountedItems.push({
                        _id: item._id,
                        name: item.title || 'Real Estate Property',
                        image: item.image || '/re1.jpg',
                        originalPrice: item.originalPrice,
                        discountedPrice: item.discountedPrice,
                        discount: item.discount,
                        categoryName: 'Real Estate',
                        categoryType: item.type || 'property',
                        source: 'property',
                        link: `/realestate/${item._id}`
                    });
                }
            });
        } catch (error) {
            console.error('Error fetching properties:', error);
        }
        
        // Fetch Sanitary items (they have originalPrice field)
        try {
            const sanitaries = await SanitaryModel.find({ isAvailable: { $ne: false } });
            sanitaries.forEach(item => {
                if (item.originalPrice && item.originalPrice > item.price) {
                    const discount = calculateDiscount(item.originalPrice, item.price);
                    if (discount > 0) {
                        allDiscountedItems.push({
                            _id: item._id,
                            name: item.name || 'Sanitary Item',
                            image: item.image || '/sanitary1.jpg',
                            originalPrice: item.originalPrice,
                            discountedPrice: item.price,
                            discount: discount,
                            categoryName: 'Sanitary',
                            categoryType: item.category || 'sanitary',
                            source: 'sanitary',
                            link: `/sanitary/${item._id}`
                        });
                    }
                }
            });
        } catch (error) {
            console.error('Error fetching sanitaries:', error);
        }
        
        // Fetch Interior items (check if we can calculate discount from price variations)
        // For now, we'll include items that are available and have stock
        try {
            const interiors = await InterirorModel.find({ isAvailable: { $ne: false } });
            // If you add discount fields to Interior model later, update this
            // For now, we can show featured/new items as "special offers"
            interiors.forEach(item => {
                // You can add logic here to mark items as special offers
                // For example, items added in last 7 days or featured items
            });
        } catch (error) {
            console.error('Error fetching interiors:', error);
        }
        
        // Fetch Land items (check for price variations)
        try {
            const lands = await LandModel.find({ is_available: { $ne: false } });
            // Similar to Interior - can add discount logic later
        } catch (error) {
            console.error('Error fetching lands:', error);
        }
        
        // Fetch Marble items (check for price variations)
        try {
            const marbles = await MarbleModel.find({ isAvailable: { $ne: false } });
            // Similar to Interior - can add discount logic later
        } catch (error) {
            console.error('Error fetching marbles:', error);
        }
        
        // Sort by discount percentage (highest first)
        const sortedItems = allDiscountedItems.sort((a, b) => b.discount - a.discount);
        
        // Get featured item (highest discount) for left column
        const featuredItem = sortedItems.length > 0 ? sortedItems[0] : null;
        
        // Get remaining items for right column
        const otherItems = sortedItems.slice(1);
        
        console.log(`Found ${sortedItems.length} discounted items`);
        
        return NextResponse.json({ 
            success: true, 
            featuredItem: featuredItem,
            items: otherItems,
            total: sortedItems.length
        });
    } catch (error) {
        console.error('Error fetching special offers:', error);
        return NextResponse.json({ 
            success: false, 
            message: error.message || "Error fetching special offers",
            error: process.env.NODE_ENV === 'development' ? error.stack : undefined
        }, { status: 500 });
    }
}

export { GET };

