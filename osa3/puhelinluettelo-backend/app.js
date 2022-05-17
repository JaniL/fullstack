const express = require('express');
const persons = require('./persons.json');

const app = express();

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

app.get('/api/persons', personsHandler)
app.get('/api/persons/:id', singlePersonHandler)

app.get('/info', infoHandler)


const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})