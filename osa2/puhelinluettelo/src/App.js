import { useState } from 'react'

const Persons = ({ persons }) => persons.map(person => <p key={person.name}>{person.name} {person.number}</p>)

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('')
  const [newPhoneNumber, setNewPhoneNumber] = useState('')
  const [filter, setFilter] = useState('')

  const handleNameOnChange = (e) => {
    setNewName(e.target.value)
  }

  const handlePhoneNumberOnChange = (e) => {
    setNewPhoneNumber(e.target.value)
  }

  const handleFilterOnChange = (e) => {
    setFilter(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const personExists = persons.findIndex(({ name }) => name === newName) !== -1
    setPersons(state => !personExists ? [...state, { name: newName, number: newPhoneNumber }] : state)
    setNewName(state => !personExists ? '' : state)
    setNewPhoneNumber(state => !personExists ? '' : state)
    if (personExists) {
      alert(`${newName} is already added to phonebook`)
    }
  }

  const filteredPersons = filter.length > 0 ? persons.filter(({ name }) => name.toLocaleLowerCase().includes(filter.toLocaleLowerCase())) : persons

  return (
    <div>
      <h2>Phonebook</h2>
      filter shown with <input value={filter} type={'text'} onChange={handleFilterOnChange} />
      <h2>add a new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <div>name: <input value={newName} onChange={handleNameOnChange}  /></div>
          <div>number: <input value={newPhoneNumber} onChange={handlePhoneNumberOnChange} /></div>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} />
    </div>
  )

}

export default App