const mongoose = require('mongoose')
const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.DB_URL}/${process.env.DB_COLLECTION_NAME}`);
        console.log('Connected to MongoDB successfully');
    } catch (error) {
        console.error('Error connecting to MongoDB:');
    }
};

module.exports = connectDB;