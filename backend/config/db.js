const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        // Support both MONGO_URL and MONGODB_URI for flexibility
        const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URL;
        if (!mongoUri) {
            throw new Error("MongoDB connection string is not defined in environment variables");
        }

        await mongoose.connect(mongoUri, {
            // Add connection options for production
            maxPoolSize: 10,
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        });
        console.log("MongoDB Connected successfully");
    } catch (err) {
        console.error("Error connecting to MongoDB:", err.message);
        process.exit(1);
    }
}

module.exports = connectDB;