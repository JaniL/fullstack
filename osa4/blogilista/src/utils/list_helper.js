const dummy = (blogs) => 1

const totalLikes = blogs =>
  blogs
    .map(blog => blog.likes)
    .reduce((prev, cur) => prev + cur, 0)

const favoriteBlog = blogs =>
  blogs
    .reduce((prev, cur) => prev === null || cur.likes > prev.likes ? cur : prev, null)

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}