const mongoose = require("mongoose");

async function connectDB() {
  await mongoose.connect(
    "mongodb+srv://Arkapravo-Test:Arkapravo%40789@sheriyans-nodejs.xgfwazq.mongodb.net/halley",

    console.log("Connected to DB"),
  );
}

module.exports = connectDB;
