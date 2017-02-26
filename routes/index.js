var express = require('express');
var router = express.Router();
var Book = require('../models/book');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/books', function(req, res, next) {
  console.log('getting all books');
  Book.find({}).exec(function(err,books){
    if(err){
      res.send('error has ocurred');
    }else{
      res.json(books);
    }
  });

});

router.get('/books/:id', function(req, res, next) {
  console.log('getting one book');
  Book.findOne({_id:req.params.id}).exec(function(err,book){
    if(err){
      res.send('error has ocurred');
    }else{
      console.log(book);
      res.json(book);
    }
  });

});

router.post('/book2', function(req, res, next) {
    Book.create(req.body,function(err,book){

      if(err){
      res.send('error saving book');
    }else{
      console.log(book);
      res.send(book);
    }
  });
});

router.post('/book', function(req, res, next) {

  var newBook= new Book ({
      title: req.body.title,
      author: req.body.author,
      category: req.body.category
  });

  /*var newBook= new Book ();

  newBook.title=req.body.title;
  newBook.author=req.body.author;
  newBook.category=req.body.category;*/

  newBook.save(function(err,book){
    if(err){
      res.send('error saving book');
    }else{
      console.log(book);
      res.send(book);
    }
  });

});

router.put('/books/:id', function(req, res, next) {
  console.log('updating one book');
  Book.findOneAndUpdate({_id:req.params.id},{ $set: { author: req.body.author }},
  {upsert:true}, function(err,book){
    if(err){
      res.send('error has ocurred');
    }else{
      console.log(book);
      res.json(book);
    }
  });

});

router.delete('/books/:id', function(req, res, next) {
  console.log('Removing one book');
  Book.findOneAndRemove({_id:req.params.id},function(err,book){
    if(err){
      res.send('error has ocurred');
    }else{
      console.log(book);
      res.status(204);
    }
  });

});

module.exports = router;
