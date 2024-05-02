import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()

const connectDB = async (uri: string) => {
  try {
    await mongoose.connect(uri);
    console.log("MongoDB Database Connected...")
  } catch (err: unknown) {
    console.error(err)
    process.exit(1) 
  }
}

export default connectDB
