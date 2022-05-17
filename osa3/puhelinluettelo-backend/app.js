const express = require('express');
const morgan = require('morgan');
const isObject = require('lodash.isobject')
const cors = require('cors');
let persons = require('./persons.json')

const { Person } = require('./mongo')

const app = express();

morgan.token('body', (req, res) => JSON.stringify(req.body));

const morganInstance = morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    tokens['body'](req,res)
  ].join(' ')
})

app.use(cors())

app.use(express.json())
app.use(morganInstance)

app.use(express.static('frontend'))

const personsHandler = (_, res) => {
  Person.find({}).then(persons => {
    res.status(200).json(persons);
  })
}

const infoHandler = (_, res) => {
  const html = `
    <html>
    <head>
    <title>Phonebook info</title>
    </html>
    <body>
      <p>Phonebook has info for ${persons.length} people</p>
      <p>${new Date()}</p>
    </body>
  `
  res.status(200).send(html);
}

const singlePersonHandler = (req, res) => {
  const person = persons.find(({ id }) => Number(req.params.id) === Number(id))
  if (person) {
    res.status(200).send(person)
  } else {
    res.sendStatus(404)
  }
}

const deletePersonHandler = (req, res) => {
  const person = persons.find(({ id }) => Number(req.params.id) === Number(id))
  if (!person) {
    res.sendStatus(404)
    return
  }
  persons = persons.filter(({ id }) => Number(req.params.id) !== Number(id))
  res.sendStatus(204)
}

const insertPersonHandler = (req, res) => {
  const mandatoryFields = ['name', 'number']
  if (!isObject(req.body)) {
    res.status(400).json({ error: 'Body data must be an JSON object'})
    return
  }

  const fieldExist =
    Object.fromEntries(
      mandatoryFields
      .map(field => [field, Object.keys(req.body).includes(field)])
    )
  const fieldsExist =
    Object.values(fieldExist)
      .every(bool => bool === true)
  if (!fieldsExist) {
    const fieldsMissing =
      Object.entries(fieldExist)
        .filter(([_, exists]) => exists === false)
        .map(([field,]) => field)
    const fieldWord = fieldsMissing.length > 1 ? 'fields' : 'field'
    res.status(400).json({ error: `Following ${fieldWord} missing: ${fieldsMissing.join(', ')}`})
    return
  }

  const personExists = persons.find(({ name }) => name === req.body.name)

  if (personExists) {
    res.status(409).json({ error: 'Person already exists'})
    return
  }

  const newPerson = {
    id: Math.floor(Math.random() * 100),
    name: req.body.name,
    number: req.body.number
  }
  persons = [...persons, newPerson]
  res.status(201).json(newPerson)
}

app.get('/api/persons', personsHandler)
app.post('/api/persons', insertPersonHandler)
app.get('/api/persons/:id', singlePersonHandler)
app.delete('/api/persons/:id', deletePersonHandler)

app.get('/info', infoHandler)


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
