import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const mongodbconnection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {

        });
        console.log("Connected to database");
    } catch (err) {
        console.error("Database connection error", err);
    }
};

export default mongodbconnection;
