var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var postSchema=new mongoose.Schema({
  title:String,
  body:String,
  created:Date,
  updated:Date
})

mongoose.model('Post',postSchema);
