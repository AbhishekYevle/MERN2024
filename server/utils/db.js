const mongoose = require('mongoose');
// const URI = "mongodb://127.0.0.1:27017/mern-admin";

// mongoose.connect(URI);
const URI = process.env.MONGODB_URI;

const connectDB = async () => {
    try {
        await mongoose.connect(URI);
        console.log("Connection Successfull to Databse");
    } catch (error) {
        console.error("Database Connection Failed.");
        process.exit(0);
    }
}

module.exports = connectDB;