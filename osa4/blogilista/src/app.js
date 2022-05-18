const express = require('express')

const { PORT } = require('./config')
const api = require('./routers/api')
const middlewares = require('./routers/middlewares')

const app = express()

app.use(middlewares)
app.use('/api', api)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})