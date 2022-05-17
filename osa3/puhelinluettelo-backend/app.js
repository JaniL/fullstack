const express = require('express');
const persons = require('./persons.json');

const app = express();

const personsHandler = (req, res) => {
  res.status(200).json(persons);
}

app.get('/api/persons', personsHandler)

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})