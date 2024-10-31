import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      connectTimeoutMS: 10000, // Timeout after 10 seconds
      serverSelectionTimeoutMS: 5000, // Retry for 5 seconds if initial connection fails
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
      autoReconnect: true, // Automatically try to reconnect
      reconnectTries: 3, // Retry up to 3 times
      reconnectInterval: 2000, // Wait 2 seconds between retry attempts
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    process.exit(1); // Exit the process if connection fails
  }
};

export default connectDB;
