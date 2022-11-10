import mongoose from "mongoose";
import dotenv from "dotenv";

export async function dbConnectionTest() {
  try {
    dotenv.config();
    const dbUri = process.env.DB_CONNECT;
    await mongoose.connect(`${dbUri}`);
  } catch (error) {
    console.log("DB connect error");
  }
}

export async function dbDisconnectTest() {
  try {
    await mongoose.connection.close();
  } catch (error) {
    console.log("DB disconnect error");
  }
}
