var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('viewpost', {
      title:'Add Post',
      post:post
    })
});