import axios from 'axios'

const jsonServerInstance = axios.create({
  baseURL: 'http://localhost:3001'
})

const getAllPersons = () =>
  jsonServerInstance.get('/persons')
    .then(res => res.data)


const savePerson = (name, number) =>
  jsonServerInstance.post('/persons', { name, number })

const deletePerson = (id) =>
  jsonServerInstance.delete('/persons/' + id)

const updatePerson = (id, newName, newNumber) =>
  jsonServerInstance.put('/persons/' + id, { name: newName, number: newNumber })

export { getAllPersons, savePerson, deletePerson, updatePerson }