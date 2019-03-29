import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ action, text }) =>
  <button onClick={action}>{text}</button>

const GiveFeedback = ({ increments }) => {
  const buttons = Object.keys(increments)
    .map(key => <Button action={increments[key]} text={key} key={key} />)
  return (
    <div>
      <h1>Anna palautetta</h1>
      {buttons}   
    </div>
  )
}

const Statistic = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
)

const Statistics = ({ good, neutral, bad}) => {
  if (good === 0 && neutral === 0 && bad === 0) {
    return (
      <div>
        <h1>statistiikka</h1>
        Ei yhtään palautetta annettu
      </div>
    )
  }
  const sum = good + neutral + bad
  const average = (good - bad) / sum
  const positive = good / sum * 100
  return (
    <div>
      <h1>statistiikka</h1>
      <table>
        <Statistic text="hyvä" value={good} />
        <Statistic text="neutraali" value={neutral} />
        <Statistic text="huono" value={bad} />
        <Statistic text="yhteensä" value={sum} />
        <Statistic text="keskiarvo" value={average} />
        <Statistic text="positiivisia" value={`${positive} %`} />
      </table>
    </div>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increments = {
    hyvä: () => setGood(good + 1),
    neutraali: () => setNeutral(neutral + 1),
    huono: () => setBad(bad + 1)
  }

  return (
    <div>
      <GiveFeedback increments={increments} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)