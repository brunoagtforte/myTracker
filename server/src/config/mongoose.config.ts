import { connect } from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

export async function dbConnect() {
  try {
    if (!MONGODB_URI) {
      throw new Error("MONGODB_URI is not defined");
    }
    await connect(MONGODB_URI, {
      dbName: 'trades'
    })
    console.log("pinged your deployment. You successfully connected to MongoDB")
  } catch (error) {
    console.log(error)
    throw error
  }
}

