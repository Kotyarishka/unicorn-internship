import mongoose from "mongoose";
import { env } from "../constants/env.js";

const connectToDb = async () => {
  try {
    await mongoose.connect(env.MONGO_URI, {});

    console.log("Connected to database");
  } catch (error) {
    console.error("Error connecting to database: ", error);
  }
};

export default connectToDb;
