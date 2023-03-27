import mongoose from "mongoose";

export const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: "backendjsapi",
    })
    .then(() => {
      console.log("db connected");
    })
    .catch((e) => {
      console.log(e);
    });
};
