var mongoose = require('mongoose');

//Schema design

var Schema=mongoose.Schema;

var BookSchema= new Schema({
    title: String,
    author: String,
    category: String
},{collection:'books'});
module.exports=mongoose.model('Book',BookSchema);
