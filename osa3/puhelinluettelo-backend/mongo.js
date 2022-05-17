const mongoose = require('mongoose');

const [,,password, name, number] = process.argv

mongoose.connect(`mongodb+srv://phonebook:${password}@cluster0.qhji7.mongodb.net/?retryWrites=true&w=majority`);

const Person = mongoose.model('Person', { id: mongoose.ObjectId, name: String, number: String });

if (name === undefined && number === undefined) {
  Person.find({}).then(persons => {
    console.log('phonebook:')
    const humanFriendlyPersons = persons.map(({name, number}) => `${name} ${number}`).join('\n')
    console.log(humanFriendlyPersons)
    mongoose.connection.close().then(() => process.exit(0))
  })
} else {
  const newPerson = new Person({ name, number });
  newPerson.save().then(() => {
    console.log(`added ${name} number ${number} to phonebook`)
    mongoose.connection.close().then(() => process.exit(0))
  });
}
