const dummy = (blogs) => 1

const totalLikes = blogs =>
  blogs
    .map(blog => blog.likes)
    .reduce((prev, cur) => prev + cur, 0)

const favoriteBlog = blogs =>
  blogs
    .reduce((prev, cur) => prev === null || cur.likes > prev.likes ? cur : prev, null)

const mostBlogs = blogs => {

  if (!blogs || blogs.length === 0) {
    return null
  }

  const authorCounts =
   blogs
     .map(blog => blog.author)
     .reduce((prev, cur) => ({...prev, [cur]: (prev[cur] || 0) + 1 }), {})

  const entriesSortedByCount = Object.entries(authorCounts).sort((prev, next) => next[1] - prev[1])

  return entriesSortedByCount[0][0]
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}