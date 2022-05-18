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

describe('most blogs', () => {
  test('is not found when the list is empty', () => {
    const blogs = []

    const result = listHelper.mostBlogs(blogs)
    expect(result).toBe(null)
  })

  test('when list has only one blog equals the author of that blog', () => {
    const blogs = [
      exampleBlogEntry
    ]

    const result = listHelper.mostBlogs(blogs)
    expect(result).toEqual(exampleBlogEntry.author)
  })

  test('is the blog with largest number of likes', () => {
    const biggestAuthor = 'Matt Doe'
    const groupOfLikeNumbers = ['Aake Kalliala', 'John', biggestAuthor, 'J-P Jepa', biggestAuthor]
    const blogs = groupOfLikeNumbers.map(num => ({...exampleBlogEntry, author: num }))

    const result = listHelper.mostBlogs(blogs)
    expect(result).toEqual(biggestAuthor)
  })
})

describe('most likes', () => {
  test('is not found when the list is empty', () => {
    const blogs = []

    const result = listHelper.mostLikes(blogs)
    expect(result).toBe(null)
  })

  test('when list has only one blog equals the likes of that blog', () => {
    const author = 'Aake'
    const numberOfLikes = 9001
    const authorWithLikes = { author, likes: numberOfLikes }
    const singleBlogEntry = {...exampleBlogEntry, ...authorWithLikes}
    const blogs = [
      singleBlogEntry
    ]

    const result = listHelper.mostLikes(blogs)
    expect(result).toEqual(authorWithLikes)
  })

  test('is the author with largest number of likes', () => {
    const numberOfLikes = 9001
    const biggestAuthor = 'Matt Doe'
    const groupOfLikeNumbers = ['Aake Kalliala', 'John', biggestAuthor, 'J-P Jepa', biggestAuthor]
    const blogs = groupOfLikeNumbers.map(num => ({...exampleBlogEntry, author: num, likes: numberOfLikes }))

    const result = listHelper.mostLikes(blogs)
    expect(result).toEqual({ author: biggestAuthor, likes: numberOfLikes * 2 })
  })
})