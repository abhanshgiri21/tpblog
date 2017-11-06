var mongoose = require('mongoose');
var db = mongoose.connection;
var bcrypt = require('bcrypt');

var UserSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        index:true
    },
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        bcrypt:true,
        required:true
    },
    profileimage:{
        type:String
    }
});

var User = module.exports = mongoose.model('User', UserSchema);

module.exports.createUser = function(newUser, callback){
    //hashing the password
    bcrypt.hash(newUser.password, 10, function(err, hash){
        if (err) throw err;

        //set password as hash
        newUser.password = hash;

        //save to database
        newUser.save(callback);
    });
}

//finding the user
module.exports.getUserByUsername = function(username, callback){
    var query = {username:username};
    User.findOne(query, callback);
}