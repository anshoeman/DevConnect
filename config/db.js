const mongoose = require("mongoose");
const URI =
  "mongodb+srv://anshuman2002:anshuman2002@cluster0.faoyi.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const connectDB = async () => {
  try {
    await mongoose.connect(URI);
    console.log("MongoDB connected");
  } catch (err) {
    console.log(err);
  }
};  

module.exports = connectDB;
