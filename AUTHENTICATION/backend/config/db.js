const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected Successfully: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    
    // More specific error messages
    if (error.message.includes('ENOTFOUND')) {
      console.error('Could not reach MongoDB Atlas. Check your internet connection or cluster address.');
    } else if (error.message.includes('Authentication failed')) {
      console.error('MongoDB authentication failed. Check your username and password.');
    } else if (error.message.includes('whitelist')) {
      console.error('Your IP is not whitelisted. Add your current IP in MongoDB Atlas Network Access settings.');
    }
    
    process.exit(1);
  }
};

module.exports = connectDB;