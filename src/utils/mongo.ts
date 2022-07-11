import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export async function connectToMongo() {
  try {
    await mongoose.connect(process.env.DB_URI!);
    console.log('Connected to database');
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}
