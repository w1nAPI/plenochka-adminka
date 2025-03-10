const mongoose = require("mongoose");

const DB_URl = "mongodb://localhost:27017";

async function connectToDatabase() {
  try {
    await mongoose.connect(DB_URl, {
      dbName: "data-films",
    });
    console.log("Успешное подключение к MongoDB");
  } catch (err) {
    console.log("При подключении MongoDB возникла ошибка");
    console.error(err);
  }
}

module.exports = connectToDatabase;
