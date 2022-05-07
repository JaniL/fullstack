import axios from 'axios'

const jsonServerInstance = axios.create({
  baseURL: 'http://localhost:3001'
})

const getAll = () =>
  jsonServerInstance.get('/persons')
    .then(res => res.data)


const save = (name, number) =>
  jsonServerInstance.post('/persons', { name, number })

export { getAll, save }