import axios from 'axios'

const useProduction = process.env.REACT_APP_USE_HEROKU === 'true'

const phonebookBackend = axios.create({
  baseURL: useProduction ? 'https://janluu-phonebook-backend.herokuapp.com' : 'https://127.0.0.1:3001'
})

export const getAllPersons = () =>
  phonebookBackend.get('/api/persons')

export const savePerson = (newName, newPhoneNumber) =>
  phonebookBackend.post('/api/persons', { name: newName, number: newPhoneNumber })

export const deletePerson = (id) =>
  phonebookBackend.delete('/api/persons/' + id)

export const updatePerson = (id, body) => {
  throw new Error('Not implemented')
}