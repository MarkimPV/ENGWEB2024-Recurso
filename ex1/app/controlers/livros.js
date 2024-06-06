const Livro = require('../models/livros');

module.exports.list = async () => {
    return await Livro
      .find();
}

module.exports.findById = async(id) => {
  return Livro
    .findOne({ _id: id });
}

module.exports.findByName = async (nome) => {
  return Livro.find({ characters: { $elemMatch: { $regex: nome, $options: 'i' } } });
}

module.exports.findByGenre = async (genre) => {
  return Livro.find({ genres: genre });
}

module.exports.getAllGenres = async () => {
  return Livro.distinct('genres').sort();
}

module.exports.getAllCharacters = async () => {
  return Livro.distinct('characters').sort();
}

module.exports.addBook = async (novoLivro) => {
  return Livro.create(novoLivro);
}

module.exports.deleteBookById = async (id) => {
  return Livro.deleteOne({ _id: id });
}

module.exports.updateBookById = async (id, livro) => {
  return Livro.updateOne({ _id: id }, livro);
}