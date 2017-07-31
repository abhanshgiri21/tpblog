var express = require('express');
var router = express.Router();
var db = require('mongoose').connect('localhost/tpblog');
var Post = require('../model/posts');

/* GET home page. */
router.get('/', function(req, res, next) {
  Post.find({}, {}, function(err, posts){
    if (err){
      throw err;
    }
    console.log("*************************************************************");
    console.log(posts);
    res.render('index',{
      posts:posts
    })
  });
});

module.exports = router;
