var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/tpblog');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error!'));
db.once('open', callback);

var PostSchema = mongoose.Schema({
	title:{
		type:String,
		required:true
	},
	date:{
		type:Date,
		required:true,
		default:Date.now
	},
	body:{
		type:String,
		required:true
	},
	author:{
		type:String,
		required:true
	}
});


var Post = module.exports = mongoose.model('Post', PostSchema);
