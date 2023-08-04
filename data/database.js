import mongoose from "mongoose";
export const connectDB = async () => {
  const URL = process.env.MONGO_URI;
  try {
    await mongoose.connect(URL, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log(`db connected `);
  } catch (error) {
    console.log(error);
  }
};
