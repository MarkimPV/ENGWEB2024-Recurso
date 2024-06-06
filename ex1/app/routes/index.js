var express = require('express');
var router = express.Router();

var Livros = require('../controlers/livros')

/* GET home page. */
router.get('/books', async function(req, res, next) {
var out;
if(req.query.charater){
  out = await Livros.findByName(req.query.charater)
  }else if (req.query.genre){
    out = await Livros.findByGenre(req.query.genre)
  }else{
    out = out = await Livros.list();    
  }
  res.json(out)
});


router.get('/books/genres',async function(req, res, next) {
  var livros = await Livros.getAllGenres();
  res.json(livros);
});

router.get('/books/characters:',async function(req, res, next) {
  var livros = await Livros.getAllCharacters();
  res.json(livros);
});

router.get('/books/:id',async function(req, res, next) {
  var livros = await Livros.findById(req.params.id);
  res.json(livros);
});

router.post('/books',async function(req, res, next) {
  await Livros.addBook(req.body)
});

router.delete('/books/:id',async function(req, res, next) {
  await Livros.deleteBookById(req.params.id)
});

router.put('/books/:id',async function(req, res, next) {
  await Livros.update(req.params.id,req.body)
});



module.exports = router;
