const dummy = (blogs) => 1

const totalLikes = blogs =>
  blogs
    .map(blog => blog.likes)
    .reduce((prev, cur) => prev + cur, 0)

module.exports = {
  dummy,
  totalLikes
}