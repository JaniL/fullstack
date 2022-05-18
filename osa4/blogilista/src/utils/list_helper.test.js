const listHelper = require('./list_helper')

const exampleBlogEntry = {
  title: 'Piisamit söivät Aake Kallialan mökkilaiturin',
  author: 'IS',
  url: 'https://www.is.fi/kotimaa/art-2000000267292.html',
  likes: 9001
}

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  test('of empty list is zero', () => {
    const blogs = []

    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(0)
  })

  test('when list has only one blog equals the likes of that', () => {
    const numberOfLikes = 9001
    const blogs = [
      {...exampleBlogEntry, likes: numberOfLikes }
    ]

    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(numberOfLikes)
  })

  test('of a bigger list is calculated right', () => {
    const groupOfLikeNumbers = [1000, 2000, 5000]
    const blogs = groupOfLikeNumbers.map(num => ({...exampleBlogEntry, likes: num }))

    const result = listHelper.totalLikes(blogs)
    expect(result).toBe(8000)
  })
})

describe('favorite blog', () => {
  test('is not found when the list is empty', () => {
    const blogs = []

    const result = listHelper.favoriteBlog(blogs)
    expect(result).toBe(null)
  })

  test('when list has only one blog equals that blog', () => {
    const blogs = [
      exampleBlogEntry
    ]

    const result = listHelper.favoriteBlog(blogs)
    expect(result).toEqual(exampleBlogEntry)
  })

  test('is the blog with largest number of likes', () => {
    const largestNumber = 9001
    const groupOfLikeNumbers = [1000, largestNumber, 2000, 5000]
    const blogs = groupOfLikeNumbers.map(num => ({...exampleBlogEntry, likes: num }))

    const result = listHelper.favoriteBlog(blogs)
    expect(result).toEqual({...exampleBlogEntry, likes: largestNumber })
  })
})