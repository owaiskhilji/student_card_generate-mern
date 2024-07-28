import { configDotenv } from "dotenv";
import app from "../../server.js";
import { DB_Name } from "../utils/constants.js";
import mongoose from "mongoose";

// Connect to MongoDBC 

async function connectDB() {
try {
    const connectInstance = await mongoose.connect(`${process.env.MONGOOSE_URL}/${DB_Name}`)
console.log("Mongodb Connected !! DB Host : ",connectInstance.connection.host)
} catch (error) {
    console.log("DB connection error :", error)
}
}

export {connectDB}