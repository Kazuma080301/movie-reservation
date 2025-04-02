const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI); // ✅ No options needed
        console.log(`📡 MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`❌ MongoDB Connection Error: ${error.message}`);
        process.exit(1);
    }
};

mongoose.connection.on('error', (err) => {
    console.error(`❌ MongoDB Error: ${err.message}`);
});

mongoose.connection.on('disconnected', () => {
    console.log('⚠️ MongoDB Disconnected');
});

module.exports = connectDB;