const mongoose = require('mongoose')

const Schema = mongoose.Schema;


const blogPostSchema = new Schema({
    title: String,
    blogSummary:String,
    body:String,
  },
    {
        timestamps:true
    }
  );

  var blogPost = mongoose.model('blogPost',blogPostSchema)

  module.exports = blogPost