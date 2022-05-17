const express = require('express');
const persons = require('./persons.json');

const app = express();

const personsHandler = (req, res) => {
  res.status(200).json(persons);
}

const infoHandler = (req, res) => {
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

app.get('/api/persons', personsHandler)
app.get('/info', infoHandler)

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})