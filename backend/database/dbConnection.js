import mongoose from "mongoose";

export const dbConnection = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: "MERN_STACK_EVENT_MESSAGE"
    })
    .then(() => {
      console.log("✅ Database connected successfully");
      console.log(`📊 Database: MERN_STACK_EVENT_MESSAGE`);
    })
    .catch((err) => {
      console.error("❌ Database connection failed:", err.message);
    });
};