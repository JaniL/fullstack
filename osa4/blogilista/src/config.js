const MONGOURL = process.env.NODE_ENV === 'test' ? 'mongodb://localhost:27018/bloglist' : 'mongodb://localhost/bloglist'
const PORT = 3003

module.exports = {
  MONGOURL,
  PORT
}