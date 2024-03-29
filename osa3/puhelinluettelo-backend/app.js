const express = require('express');
const morgan = require('morgan');
const isObject = require('lodash.isobject');
const cors = require('cors');
const { isValidObjectId } = require('mongoose');

const { Person } = require('./mongoService');

const app = express();

morgan.token('body', (req) => JSON.stringify(req.body));

const morganInstance = morgan((tokens, req, res) => [
  tokens.method(req, res),
  tokens.url(req, res),
  tokens.status(req, res),
  tokens.res(req, res, 'content-length'), '-',
  tokens['response-time'](req, res), 'ms',
  tokens.body(req, res),
].join(' '));

app.use(cors());

app.use(express.json());
app.use(morganInstance);

app.use(express.static('frontend'));

// can't bother fixing this in frontend so
const fixId = (person) => ({
  // eslint-disable-next-line no-underscore-dangle
  id: person._id,
  name: person.name,
  number: person.number,
});

const personsHandler = (_, res, next) => {
  Person.find({}).then((persons) => {
    res.status(200).json(persons.map(fixId));
  }).catch((err) => next(err));
};

const infoHandler = (_, res) => {
  Person.count()
    .then((count) => {
      const html = `
      <html>
      <head>
      <title>Phonebook info</title>
      </html>
      <body>
        <p>Phonebook has info for ${count} people</p>
        <p>${new Date()}</p>
      </body>
    `;
      res.status(200).send(html.trim());
    });
};

const singlePersonHandler = (req, res) => {
  if (!isValidObjectId(req.params.id)) {
    res.status(500).json('Not a valid id');
    return;
  }
  Person.findById(req.params.id)
    .then((person) => {
      if (person) {
        res.status(200).send(fixId(person));
      } else {
        res.sendStatus(404);
      }
    });
};

const deletePersonHandler = (req, res, next) => {
  if (!isValidObjectId(req.params.id)) {
    res.status(500).json('Not a valid id');
    return;
  }
  Person.findByIdAndRemove(req.params.id).then(() => {
    res.sendStatus(204);
  }).catch((err) => next(err));
};

const updatePersonHandler = (req, res, next) => {
  if (!isValidObjectId(req.params.id)) {
    res.status(500).json('Not a valid id');
    return;
  }
  const { id } = req.params;
  const { name, number } = req.body;
  Person.findByIdAndUpdate(id, { name, number })
    .then((person) => {
      res.status(204).json(fixId(person));
    }).catch((err) => next(err));
};

const insertPersonHandler = (req, res, next) => {
  const mandatoryFields = ['name', 'number'];
  if (!isObject(req.body)) {
    res.status(400).json({ error: 'Body data must be an JSON object' });
    return;
  }

  const fieldExist = Object.fromEntries(
    mandatoryFields
      .map((field) => [field, Object.keys(req.body).includes(field)]),
  );
  const fieldsExist = Object.values(fieldExist)
    .every((bool) => bool === true);
  if (!fieldsExist) {
    const fieldsMissing = Object.entries(fieldExist)
      .filter(([, exists]) => exists === false)
      .map(([field]) => field);
    const fieldWord = fieldsMissing.length > 1 ? 'fields' : 'field';
    res.status(400).json({ error: `Following ${fieldWord} missing: ${fieldsMissing.join(', ')}` });
    return;
  }

  const newPerson = new Person({
    name: req.body.name,
    number: req.body.number,
  });
  newPerson.save().then((dbRes) => {
    res.status(201).json(dbRes);
  }).catch((err) => next(err));
};

app.get('/api/persons', personsHandler);
app.post('/api/persons', insertPersonHandler);
app.get('/api/persons/:id', singlePersonHandler);
app.put('/api/persons/:id', updatePersonHandler);
app.delete('/api/persons/:id', deletePersonHandler);

app.get('/info', infoHandler);

// eslint-disable-next-line consistent-return
const errorHandler = (error, request, response, next) => {
  // eslint-disable-next-line no-console
  console.error(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' });
  }

  next(error);
};

const myOwnErrorHandler = (error, request, response) => {
  response.status(500).json({ error: error.message });
};

app.use(errorHandler);
app.use(myOwnErrorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on port ${PORT}`);
});
