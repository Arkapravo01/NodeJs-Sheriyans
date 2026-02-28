const mongoose = require("mongoose");

async function connectToDB() {
  await mongoose.connect(
    "mongodb+srv://Arkapravo-Test:Arkapravo%40789@sheriyans-nodejs.xgfwazq.mongodb.net/Project-1",

    console.log("Connected to DB"),
  );
}

module.exports = connectToDB;
