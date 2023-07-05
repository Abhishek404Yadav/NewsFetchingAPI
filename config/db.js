const mongoose = require("mongoose");
const URI = process.env.MONGO_URI;

const connectDB = async () => {
  const con = await mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log(`cloud is connected to ${con.connection.host}`);
};
module.exports = connectDB;
