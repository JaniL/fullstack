const mongoose = require('mongoose');

const password = process.env.MONGODB_PASSWORD;

mongoose.connect(`mongodb+srv://phonebook:${password}@cluster0.qhji7.mongodb.net/?retryWrites=true&w=majority`);

const personProps = {
  id: mongoose.ObjectId,
  name: {
    type: String,
    minLength: 3,
    required: [true, 'Person name required'],
  },
  number: {
    type: String,
    minLength: 8,
    validate: {
      validator: (v) => /^\d{2,3}-\d*$/.test(v),
      message: (props) => `${props.value} is not a valid phone number!`,
    },
    required: [true, 'Person phone number required'],
  },
};

const Person = mongoose.model('Person', personProps);

module.exports = { Person };
