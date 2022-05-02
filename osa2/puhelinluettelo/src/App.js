import { useState } from 'react'

const Persons = ({ persons }) => persons.map(person => <p key={person.name}>{person.name} {person.number}</p>)

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1231244' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newPhoneNumber, setNewPhoneNumber] = useState('')

  const handleNameOnChange = (e) => {
    setNewName(e.target.value)
  }

  const handlePhoneNumberOnChange = (e) => {
    setNewPhoneNumber(e.target.value)
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

  return (
    <div>
      <h2>Phonebook</h2>
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
      <Persons persons={persons} />
    </div>
  )

}

export default App