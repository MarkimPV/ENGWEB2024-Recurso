const mongoose = require('mongoose');

const livroSchema = new mongoose.Schema({
  _id: String,
  title: String,
  series: String,
  author: [String],
  rating: String,
  description: String,
  language: String,
  isbn: String,
  genres: [String],
  characters: [String],
  bookFormat: String,
  edition: String,
  pages: String,
  publisher: String,
  publishDate: String,
  firstPublishDate: String,
  awards: String,
  numRatings: String,
  ratingsByStars: [String]
}, { versionKey: false });

module.exports = mongoose.model('livros', livroSchema);