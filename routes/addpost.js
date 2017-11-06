var express = require('express');
var router = express.Router();


//include post model
var Post = require('../model/posts');

//serve the addpost page
router.get('/', ensureAuthenticated, function(req, res, next) {
  res.render('addpost', {title:'Add Post'})
});

//post request from addpost page comes here
router.post('/add', function(req, res, next){
  
  //extracting all the data from req.body form the form
  var title = req.body.title;
  var body = req.body.body;
  var author = req.body.author;
  
  //logging the body just for checking
  console.log(req.body);

  //form validation
  req.checkBody('title', 'title field is required').notEmpty();
  req.checkBody('body', 'body field is required').notEmpty();
  req.checkBody('author', 'author field is required').notEmpty();

  //all errors in this variables
  var errors = req.validationErrors();


  //if errors are found, render this page
  if(errors){
    res.render('addpost',{
      errors:errors,
      title:title,
      body:body,
      author:author
    })
  }
  //creating the object to submit to the db
  var post = new Post({
    title:title,
    body:body,
    author:author,
    date:formattedDate
  });
  post.save(function(err, post){
    if (err){
      throw err;
    }
    res.render('addpost',{
      success:true
    });

  });
});

function ensureAuthenticated(req, res){
  if(req.isAuthenticated()){
    return next();
  }
  return res.render('login');
}
module.exports = router;
