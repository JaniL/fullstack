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

export { getAllPersons, savePerson, deletePerson }