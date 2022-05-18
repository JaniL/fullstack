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
    const newEntry = request.body
    const newEntryWithLikes = newEntry.likes ? newEntry : {...newEntry, likes: 0 }
    const blog = new Blog(newEntryWithLikes)
  
    blog
      .save()
      .then(result => {
        response.status(201).json(result)
      })
      .catch(error => {
        response.status(400).json(error)
      })
  })

blogRouter.route('/:id')
  .delete(async (request, response) => {
    try {
      const dbRes = await Blog.findByIdAndDelete(request.params.id)
      response.status(200).json(dbRes)
    } catch (error) {
      response.status(500).json(error)
    }
  })
  .put(async (request, response) => {
    try {
      const dbRes = await Blog.findByIdAndUpdate(request.params.id, request.body)
      response.status(200).json(dbRes ? {...dbRes, ...request.body } : null)
    } catch (error) {
      response.status(500).json(error)
    }
  })

module.exports = blogRouter