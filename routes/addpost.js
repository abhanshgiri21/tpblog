var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('addpost', {title:'Add Post'})
});
router.post('/add', function(req, res, next){
  var title = req.body.title;
  var body = req.body.body;
  var author = req.body.author;
  var post = {
    title:title,
    body:body,
    author:author
  }
  console.log(req.body);
  console.log(post);
  res.send('post submitted successfully')
});
module.exports = router;
