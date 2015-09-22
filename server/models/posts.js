var mongoose=require('mongoose');
var Schema=mongoose.Schema;
var postSchema=new mongoose.Schema({
  title:String,
  summary:String,
  body:String,
  views:Number,
  created:Date,
  updated:Date
})

mongoose.model('Post',postSchema);