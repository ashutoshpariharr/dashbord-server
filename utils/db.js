const mongoose = require("mongoose");

const URI = process.env.MONGODB_URI;

const connectDb = async () => {
  try {
    await mongoose.connect(URI);
    console.log("Connection connected to the database");
  } catch (error) {
    console.error("Connection not connected to the database");
    process.exit(0);
  }
};

module.exports = connectDb;
