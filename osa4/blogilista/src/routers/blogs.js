const { Router, json } = require('express')
const { Blog } = require('../services/mongo')

const blogRouter = new Router()

blogRouter.use(json())

blogRouter.route('/')
  .get((_, response) => {
    Blog
      .find({})
      .then(blogs => {
        response.json(blogs)
      })
  })
  .post((request, response) => {
    const blog = new Blog(request.body)
  
    blog
      .save()
      .then(result => {
        response.status(201).json(result)
      })
  })

module.exports = blogRouter