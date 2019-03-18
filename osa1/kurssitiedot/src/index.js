import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  const course = 'Half Stack -sovelluskehitys'

  const parts = [
    { name: 'Reactin perusteet', exercises: 10 },
    { name: 'Tiedonvälitys propseilla', exercises: 7 },
    { name: 'Komponenttien tila', exercises: 14 }
  ]

  const Header = ({ course }) => <h1>{course}</h1>
  const Content = ({ parts }) => {
    const Part = ({ name, exercises }) => <p>{name} {exercises}</p>
    return parts.map(({ name, exercises }) => (
      <Part name={name} exercises={exercises} />
    ))
  }
  const Total = ({ parts }) => {
    const totalExercises =
      parts
        .map(part => part.exercises)
        .reduce((acc, cur) => acc + cur)

    return (
      <p>yhteensä {totalExercises} tehtävää</p>
    )
  }

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  )

  /* return (
    <div>
      <Header course={course} />
      <Content ... />
      <Total ... />
    </div>
  ) */
}

ReactDOM.render(<App />, document.getElementById('root'))