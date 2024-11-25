import { envConfig } from "@/config/env";
import mongoose, { Mongoose } from "mongoose";

interface MongooseConn {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

let cached: MongooseConn = (global as any).mongoose;

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null };
}

export const connect = async () => {
  if (cached.conn) {
    return cached.conn;
  }
  
  cached.promise =
    cached.promise ||
    mongoose.connect(envConfig.mongodb.uri, {
      bufferCommands: false,
      connectTimeoutMS: 5000,
    });

  try {
    cached.conn = await cached.promise;
  } catch (err) {
    console.log(err);
    throw new Error("Error connecting to MongoDB");
  }

  return cached.conn;
};
