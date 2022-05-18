const mongoose = require('mongoose')
const { MONGOURL } = require('../config')

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

blogSchema.virtual('id').get(function(){
  return this._id.toHexString();
});

blogSchema.set('toJSON', {
  virtuals: true
});

const Blog = mongoose.model('Blog', blogSchema)

mongoose.connect(MONGOURL)

module.exports = {
  Blog
}