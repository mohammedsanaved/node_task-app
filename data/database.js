import mongoose from "mongoose";

export const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: "backendjsapi",
    })
    .then((c) => {
      console.log(`db connected ${c.connection.host}`);
    })
    .catch((e) => {
      console.log(e);
    });
};
