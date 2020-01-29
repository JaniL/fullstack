import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))

  
  const newAnecdote = () => {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
    const getRandomInt = max =>
      Math.floor(Math.random() * Math.floor(max))

    setSelected(getRandomInt(props.anecdotes.length))
  }

  const voteAnecdote = () => {
    const copyOfVotes = [...votes]
    copyOfVotes[selected] += 1
    setVotes(copyOfVotes)
  }

  const getIndexofAnecdoteWithMostVotes = () =>
    votes.indexOf(Math.max(...votes))

  const indexOfAnecoteWithMostVotes = getIndexofAnecdoteWithMostVotes()

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {props.anecdotes[selected]}<br/>
      has {votes[selected]} votes<br/>
      <button onClick={() => voteAnecdote()}>vote</button>
      <button onClick={() => newAnecdote()}>next anecdote</button>
      <h1>Anecdote with most votes</h1>
      {props.anecdotes[indexOfAnecoteWithMostVotes]}<br/>
      has {votes[indexOfAnecoteWithMostVotes]} votes<br/>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)