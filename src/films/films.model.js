const mongoose = require("mongoose");

const FilmSchema = new mongoose.Schema({
  img: { type: String, required: true },
  title: { type: String, required: true },
  subtitle: { type: String },
  price: { type: String },
  category: { type: String },
  description: { type: String },
  code: { type: String },
  firm: { type: String },
});

module.exports = mongoose.model("Film", FilmSchema);
