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

    test('should fail if title field missing', async () => {
      const blogEntry = {...exampleBlog, title: undefined }
      const response = await request(app).post('/').send(blogEntry).set('Accept', 'application/json')
      expect(response.statusCode).toBe(400)

      const blogs = await Blog.find({})
      expect(blogs.length).toBe(0)
    })

    test('should fail if url field missing', async () => {
      const blogEntry = {...exampleBlog, url: undefined }
      const response = await request(app).post('/').send(blogEntry).set('Accept', 'application/json')
      expect(response.statusCode).toBe(400)

      const blogs = await Blog.find({})
      expect(blogs.length).toBe(0)
    })

    test('should create a new blog with zero likes if likes not defined', async () => {
      const blogEntry = {...exampleBlog, likes: undefined }
      const response = await request(app).post('/').send(blogEntry).set('Accept', 'application/json')
      expect(response.statusCode).toBe(201)
      expect(response.body).toMatchObject({...blogEntry, likes: 0})

      const blogs = await Blog.find({})
      expect(blogs.length).toBe(1)
      expect(blogs[0]).toMatchObject({...blogEntry, likes: 0})
    })
  })

  describe('PUT', () => {
    test('should modify existing blog', async () => {
      const newBlog = new Blog(exampleBlog)
      await newBlog.save()
      const modifiedBlog = {...exampleBlog, title: 'Piisamit'}
      const response = await request(app).put('/' + newBlog.id).send(modifiedBlog).set('Accept', 'application/json')
      expect(response.statusCode).toBe(200)
      expect(response.body).toMatchObject(modifiedBlog)

      const blogs = await Blog.find({})
      expect(blogs.length).toBe(1)
      expect(blogs[0]).toMatchObject(modifiedBlog)
    })
    test('should return 500 with invalid id', async () => {
      const response = await request(app).put('/' + 'foo')
      expect(response.statusCode).toBe(500)
    })
    test('should return 200 even if blog does not exist', async () => {
      const newBlog = new Blog(exampleBlog)
      await newBlog.save()
      const id = newBlog.id
      await Blog.findByIdAndDelete(id)
      const response = await request(app).put('/' + newBlog.id)
      expect(response.statusCode).toBe(200)
    })
  })

  describe('DELETE', () => {
    test('should delete a blog', async () => {
      const newBlog = new Blog(exampleBlog)
      await newBlog.save()
      const response = await request(app).delete('/' + newBlog.id)
      expect(response.statusCode).toBe(200)
      expect(response.body).toMatchObject(exampleBlog)
      const blogs = await Blog.find({})
      expect(blogs.length).toBe(0)
    })
    test('should return 200 even if blog does not exist', async () => {
      const newBlog = new Blog(exampleBlog)
      await newBlog.save()
      const id = newBlog.id
      await Blog.findByIdAndDelete(id)
      const response = await request(app).delete('/' + newBlog.id)
      expect(response.statusCode).toBe(200)
    })
    test('should return 500 with invalid id', async () => {
      const response = await request(app).delete('/' + 'foo')
      expect(response.statusCode).toBe(500)
    })
  })
})