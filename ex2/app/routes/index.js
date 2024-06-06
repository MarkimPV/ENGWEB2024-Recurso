var express = require('express');
var router = express.Router();
var axios = require("axios")

/* GET home page. */
router.get('/', function(req, res, next) {
  axios.get("http://localhost:17000/books")
    .then(resp => {
      res.render('main', { title: 'Main', livros : resp.data});
    }).catch(erro => console.log(erro))
});

router.get('/:id', function(req, res, next) {
  axios.get("http://localhost:17000/books/"+req.params.id)
    .then(resp => {
      res.render('livro', { title: 'Livro', livro : resp.data});
    }).catch(erro => console.log(erro))
});

module.exports = router;
