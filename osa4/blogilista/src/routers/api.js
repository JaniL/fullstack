const { Router } = require('express')
const blogs = require('./blogs')

const apiRouter = new Router()

apiRouter.use('/blogs', blogs)

module.exports = apiRouter