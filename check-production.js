/**
 * Production Diagnostic Script
 * Run this on your production server to check for common issues
 * 
 * Usage: node check-production.js
 */

require('dotenv').config({ path: '.env.production' });

async function checkProduction() {
    console.log('🔍 Production Environment Check\n');
    
    // Check environment variables
    console.log('1. Checking Environment Variables...');
    const mongoURI = process.env.MONGODB_URI;
    const nodeEnv = process.env.NODE_ENV;
    
    if (!mongoURI) {
        console.error('❌ MONGODB_URI is not set!');
        console.log('   Please set MONGODB_URI in your production environment variables.');
        return;
    } else {
        console.log('✅ MONGODB_URI is set');
        // Don't log the full URI for security
        console.log('   URI starts with:', mongoURI.substring(0, 20) + '...');
    }
    
    if (nodeEnv !== 'production') {
        console.warn('⚠️  NODE_ENV is not set to "production"');
        console.log('   Current NODE_ENV:', nodeEnv || 'undefined');
    } else {
        console.log('✅ NODE_ENV is set to production');
    }
    
    // Check MongoDB connection
    console.log('\n2. Testing MongoDB Connection...');
    try {
        const mongoose = require('mongoose');
        await mongoose.connect(mongoURI, {
            serverSelectionTimeoutMS: 5000,
        });
        console.log('✅ Successfully connected to MongoDB');
        
        // Test a simple query
        const PropertyModel = require('./lib/models/PropertyModel').default;
        const count = await PropertyModel.countDocuments();
        console.log(`✅ Database accessible. Found ${count} properties.`);
        
        // Test finding a specific property
        const testId = '69331decc0e7840f59d67b38';
        const property = await PropertyModel.findById(testId);
        if (property) {
            console.log(`✅ Test property found: ${property.title}`);
        } else {
            console.log(`⚠️  Test property (${testId}) not found in database`);
        }
        
        await mongoose.disconnect();
    } catch (error) {
        console.error('❌ MongoDB connection failed!');
        console.error('   Error:', error.message);
        if (error.message.includes('IP')) {
            console.error('\n   💡 This might be an IP whitelist issue.');
            console.error('   Check MongoDB Atlas → Network Access → IP Whitelist');
        }
        if (error.message.includes('authentication')) {
            console.error('\n   💡 This might be an authentication issue.');
            console.error('   Check your MongoDB connection string credentials.');
        }
    }
    
    // Check file system
    console.log('\n3. Checking File System...');
    const fs = require('fs');
    const path = require('path');
    
    const uploadsDir = path.join(process.cwd(), 'uploads');
    if (fs.existsSync(uploadsDir)) {
        console.log('✅ uploads/ directory exists');
        try {
            fs.accessSync(uploadsDir, fs.constants.W_OK);
            console.log('✅ uploads/ directory is writable');
        } catch (error) {
            console.error('❌ uploads/ directory is not writable!');
            console.error('   Run: chmod 755 uploads');
        }
    } else {
        console.error('❌ uploads/ directory does not exist!');
        console.error('   Run: mkdir -p uploads && chmod 755 uploads');
    }
    
    console.log('\n✅ Diagnostic check complete!');
}

checkProduction().catch(console.error);

