import { useEffect, useState } from 'react'
import { getAllPersons, savePerson, deletePerson, updatePerson } from './JsonServerService'
import style from './App.module.css'

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

const Notification = ({ notification: { type, message }}) =>
  <>
    <div className={[style.Notification, style[type.toLocaleLowerCase()]].join(' ')}>
      {message}
    </div>
  </>

const App = () => {
  const [persons, setPersons] = useState(undefined)
  const [newName, setNewName] = useState('')
  const [newPhoneNumber, setNewPhoneNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState(undefined)

  const updatePersons = () => {
    getAllPersons()
      .then(res => setPersons(res))
  }

  const showNotification = (type, message) => {
    setNotification({ type, message })
    setTimeout(() => setNotification(undefined), 5000)
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
    const existingPerson = persons.find(({ name }) => name === newName)
    const confirmReplace = existingPerson && window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
    const clearForm = !existingPerson || (existingPerson && confirmReplace)
    setNewName(state => clearForm ? '' : state)
    setNewPhoneNumber(state => clearForm ? '' : state)
    if (existingPerson && confirmReplace) {
      updatePerson(existingPerson.id, newName, newPhoneNumber)
        .then(res => {
          showNotification('success', `Updated ${newName}`)
          return res
        })
        .then(_ => updatePersons())
        .catch(e => {
          showNotification('error', `Information of ${newName} has already been removed from server`)
          updatePersons()
          return e
        })
    } else if (!existingPerson) {
      savePerson(newName, newPhoneNumber)
        .then(_ => updatePersons())
        .then(_ => {
          showNotification('success', `Added ${newName}`)
        })
    }
  }

  const allPersons = persons !== undefined ? persons : []

  const filteredPersons = filter.length > 0 ? allPersons.filter(({ name }) => name.toLocaleLowerCase().includes(filter.toLocaleLowerCase())) : allPersons
  return (
    <div>
      <h2>Phonebook</h2>
      {notification && <Notification notification={notification} />}
      <Filter filter={filter} handleFilterOnChange={handleFilterOnChange} />
      <h3>add a new</h3>
      <PersonForm handleSubmit={handleSubmit} newName={newName} newPhoneNumber={newPhoneNumber} handleNameOnChange={handleNameOnChange} handlePhoneNumberOnChange={handlePhoneNumberOnChange}/>
      <h3>Numbers</h3>
      <Persons persons={filteredPersons} updatePersons={updatePersons} />
    </div>
  )

}

export default App