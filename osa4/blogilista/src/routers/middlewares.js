const { Router, json } = require('express')
const cors = require('cors')

const middlewareRouter = new Router()

middlewareRouter.use(cors())
middlewareRouter.use(json())

module.exports = middlewareRouter