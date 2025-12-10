import mongoose from "mongoose";

// Cache the connection to reuse in serverless environments (Vercel)
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
  try {
    // Get MongoDB URI from environment variables
    const mongoURI = process.env.MONGODB_URI;
    
    if (!mongoURI) {
      // During build time, MONGODB_URI might not be available
      // Return a mock connection object to prevent build failures
      if (process.env.NODE_ENV === 'production' && !process.env.VERCEL) {
        console.warn("MONGODB_URI is not defined. Database operations will fail at runtime.");
      }
      throw new Error("MONGODB_URI is not defined in environment variables. Please set it in Vercel environment variables.");
    }

    // If already connected, return cached connection
    if (cached.conn) {
      return cached.conn;
    }

    // If connection is in progress, wait for it
    if (!cached.promise) {
      const opts = {
        bufferCommands: false,
      };

      cached.promise = mongoose.connect(mongoURI, opts).then((mongoose) => {
        console.log("Connected to MongoDB");
        return mongoose;
      });
    }

    try {
      cached.conn = await cached.promise;
    } catch (e) {
      cached.promise = null;
      throw e;
    }

    return cached.conn;
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
};

export default connectDB;