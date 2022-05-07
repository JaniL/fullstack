import { useEffect, useState } from 'react'
import { getAllPersons, savePerson, deletePerson } from './JsonServerService'

const Persons = ({ persons, updatePersons }) => {
  return persons.map(person => {
    const handleDelete = e => {
      e.preventDefault()
      if (window.confirm(`Delete ${person.name} ?`)) {
        deletePerson(person.id)
          .then(_ => {
            updatePersons()
          })
      }
    }
    return <p key={person.name}>{person.name} {person.number} <input type="button" value="delete" onClick={handleDelete} /></p>
  })
}

const Filter = ({ filter, handleFilterOnChange }) => <>filter shown with <input value={filter} type={'text'} onChange={handleFilterOnChange} /></>

const PersonForm = ({ handleSubmit, newName, newPhoneNumber, handleNameOnChange, handlePhoneNumberOnChange }) => <><form onSubmit={handleSubmit}>
<div>
  <div>name: <input value={newName} onChange={handleNameOnChange}  /></div>
  <div>number: <input value={newPhoneNumber} onChange={handlePhoneNumberOnChange} /></div>
</div>
<div>
  <button type="submit">add</button>
</div>
</form></>

const App = () => {
  const [persons, setPersons] = useState(undefined)
  const [newName, setNewName] = useState('')
  const [newPhoneNumber, setNewPhoneNumber] = useState('')
  const [filter, setFilter] = useState('')

  const updatePersons = () => {
    getAllPersons()
      .then(res => setPersons(res))
  }

  useEffect(() => {
    if (persons !== undefined) {
      // setPersons(state => state)
      return
    } 
    updatePersons()
  }, [persons])

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
    setNewName(state => !personExists ? '' : state)
    setNewPhoneNumber(state => !personExists ? '' : state)
    if (personExists) {
      alert(`${newName} is already added to phonebook`)
    } else {
      savePerson(newName, newPhoneNumber)
        .then(_ => updatePersons())
    }
  }

  const allPersons = persons !== undefined ? persons : []

  const filteredPersons = filter.length > 0 ? allPersons.filter(({ name }) => name.toLocaleLowerCase().includes(filter.toLocaleLowerCase())) : allPersons

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilterOnChange={handleFilterOnChange} />
      <h3>add a new</h3>
      <PersonForm handleSubmit={handleSubmit} newName={newName} newPhoneNumber={newPhoneNumber} handleNameOnChange={handleNameOnChange} handlePhoneNumberOnChange={handlePhoneNumberOnChange}/>
      <h3>Numbers</h3>
      <Persons persons={filteredPersons} updatePersons={updatePersons} />
    </div>
  )

}

export default App