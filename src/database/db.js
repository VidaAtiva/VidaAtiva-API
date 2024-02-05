import mongoose from "mongoose";

const connectDatabase = async () => {
  console.log("Wait connecting to the database");

  await mongoose
    .connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB Atlas Connected"))
    .catch((error) => console.log(error));
};

export default connectDatabase;
