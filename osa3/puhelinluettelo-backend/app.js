const express = require('express');
let persons = require('./persons.json');

const app = express();
app.use(express.json())

const personsHandler = (_, res) => {
  res.status(200).json(persons);
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
  if (typeof req.body !== 'object') {
    res.sendStatus(500)
    return
  }
  const fieldsExist =
    mandatoryFields
      .map(field => Object.keys(req.body).includes(field))
      .every(bool => bool === true)
  if (!fieldsExist) {
    res.status(400).json('Invalid fields')
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


const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})