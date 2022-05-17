const mongoose = require('mongoose');

const password = process.env.MONGODB_PASSWORD

mongoose.connect(`mongodb+srv://phonebook:${password}@cluster0.qhji7.mongodb.net/?retryWrites=true&w=majority`);

const Person = mongoose.model('Person', { id: mongoose.ObjectId, name: String, number: String });

module.exports = { Person }