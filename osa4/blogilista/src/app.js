const express = require('express')

const api = require('./routers/api')
const middlewares = require('./routers/middlewares')

const app = express()

app.use(middlewares)
app.use('/api', api)

const PORT = 3003
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})