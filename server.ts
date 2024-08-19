import mongoose from "mongoose";
import app from "./app";
const DB = process.env.MONGO_URI as string;
const PORT = process.env.PORT;
const connect = async () => {
  try {
    await mongoose.connect(DB, {
      dbName: "mern",
    });
    console.log("Database Connected!");

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

connect();
