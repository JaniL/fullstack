const request = require('supertest');
const express = require('express');
const blogRouter = require('../routers/blogs')
const { Blog } = require('../services/mongo')

const exampleBlog = { title: 'Blog', author: 'Aake', url: 'http://google.fi/', likes: 0}

describe('blogs', () => {
  let app;
  beforeEach(async () => {
    await Blog.deleteMany({})
    app = express();
    app.use(blogRouter)
  })
  describe('GET', () => {

    test('should return empty list of blogs when db is empty', async () => {
      const response = await request(app).get('/')
      expect(response.statusCode).toBe(200)
      expect(response.body).toEqual([])
    })

    test('should return one blog when one is inserted', async () => {
      const newBlog = new Blog(exampleBlog)
      await newBlog.save()
      const response = await request(app).get('/')
      expect(response.statusCode).toBe(200)
      expect(response.body.length).toBe(1)
      expect(response.body[0]).toMatchObject(exampleBlog)
    })

    test('should return multiple blogs', async () => {
      const newBlog = new Blog(exampleBlog)
      await newBlog.save()
      const response = await request(app).get('/')
      expect(response.statusCode).toBe(200)
      expect(response.body.length).toBe(1)
      expect(response.body[0]).toMatchObject(exampleBlog)
    })

    test('should return id with key id', async () => {
      const newBlog = new Blog(exampleBlog)
      await newBlog.save()
      const response = await request(app).get('/')
      expect(response.statusCode).toBe(200)
      expect(response.body.length).toBe(1)
      expect(response.body[0]).toMatchObject(exampleBlog)
      expect(response.body[0]).toHaveProperty('id')
    })
  })

  describe('POST', () => {
    test('should create a new blog', async () => {
      const response = await request(app).post('/').send(exampleBlog).set('Accept', 'application/json')
      expect(response.statusCode).toBe(201)
      expect(response.body).toMatchObject(exampleBlog)

      const blogs = await Blog.find({})
      expect(blogs.length).toBe(1)
      expect(blogs[0]).toMatchObject(exampleBlog)
    })
  })
})