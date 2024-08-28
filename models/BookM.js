const mongoose = require("mongoose");
const bCrypt = require("bcrypt");

const BooksSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  published_year: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
});

const BooksModel = mongoose.model("Books", BooksSchema);
module.exports = BooksModel;
