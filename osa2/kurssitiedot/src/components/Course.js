import React from 'react'

const Header = ({ name }) => {
  return <h1>{name}</h1>
}

const Part = ({ part }) => {
  return <p>{part.name} {part.exercises}</p>
}

const Content = ({ parts }) => {
  return parts.map(part => <Part key={part.id} part={part} />)
}

const Course = ({ course }) => {
  const { name, parts, id } = course
  return (
    <>
    <Header name={name} />
    <Content parts={parts} />
    </>
  )
}

export default Course