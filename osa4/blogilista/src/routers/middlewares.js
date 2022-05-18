const { Router } = require('express')
const cors = require('cors')

const middlewareRouter = new Router()

middlewareRouter.use(cors())

module.exports = middlewareRouter