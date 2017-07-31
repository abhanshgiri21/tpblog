var express = require('express');
var router = express.Router();
var multer = require('multer');     
var upload = multer({dest:'./uploads'});
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
 

//get the user model
var User = require('../model/user.js');

//get request for register page
router.get('/', function(req, res, next){
    res.render('register', {title:'register'});
});


router.post('/register',upload.single('profileImage'), function(req, res, next){
    var name = req.body.name;
    var username = req.body.username;
    var email = req.body.email;
    var password = req.body.password;
    var password2 = req.body.password2;

    if(req.file){
        var profileImageOriginalName    = req.file.originalname;
        var profileImageName            = req.file.filename;
        var profileImageMimeType        = req.file.mimetype;
    }else{
        var profileImageName = 'noimage.png';
    }

    //validate all the fields
    req.checkBody('name', 'Name field is required').notEmpty();
    req.checkBody('username', 'username field is required').notEmpty();
    req.checkBody('email', 'Email field is required').notEmpty();
    req.checkBody('email', 'enter a valid email').isEmail();
    req.checkBody('password', 'password field is required').notEmpty();
    req.checkBody('password2', 'Passwords do not match').equals(req.body.password);
    
    //assign errors, from above validation , if any
    var errors = req.validationErrors();

    if(errors){
        res.render('register', {
            errors:errors,
            name:name,
            email:email,
            username:username
        });
    }else{
        var newUser = new User({
            name:name,
            username:username,
            email:email,
            password:password,
            profileimage:profileImageName

        });

        User.createUser(newUser, function(err, user){
            if(err) throw err;
            console.log(user);
        });

        res.redirect('/');
    }

});

router.get('/login', function(req, res){
    res.render('login',{
        title:'login'
    })
});

//passport local strategy for login
passport.use('local',new LocalStrategy(
    function(username, password, done){
        console.log('this is inside local strategy');
        User.getUserByUsername(username, function(err, user){
            if(err) throw err;
            if(!user){
                console.log('Unknown User');
                return done(null, false, {message:'Unknown user'});
            }
        });
    }
));



//login post request handler
router.post('/login', passport.authenticate('local', {failureRedirect:'/users', failureFlash:'incorrect username or password'}), function(req, res){
    console.log('Authentication successful')    ;
    req.flash('You are now logged in ');
    res.redirect('/');
});


//export the router
module.exports = router;    