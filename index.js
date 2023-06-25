const express = require('express')
const app=express()
//import db
require('./mongoconnect')
app.use(express.json())
//import route
const routebook = require('./service/book')
const routeauthor = require('./service/author')
const routeuser = require('./service/user')
app.use('/api/book',routebook)
app.use('/api/author', routeauthor)
app.use('/api/user', routeuser)
//frontend
const ejs = require('ejs')
const axios=require('axios')
const bodyParer = require('body-parser')
app.use(bodyParer.urlencoded())
app.set('view engine','ejs')
//list
app.get('/', async (req, res) => {
    const response_book = await axios.get('http://localhost:3000/api/book')
    const response_author = await axios.get('http://localhost:3000/api/author')
    const books = response_book.data
    const authors=response_author.data
    res.render('home',{books:books,authors:authors})
})
//create
app.post('/add', async (req, res) => {
    const response = await axios.get('http://localhost:3000/api/book/add', req.body)
    res.redirect('/')
    console.log(response);
})
//delete
app.get('/delete/:title', async (req, res) => {
    const response = await axios.get('http://localhost:3000/api/book/'+req.params.title)
    res.redirect('/')
})
//edit
app.get('edit/:title', async (req, res) => {
  const response = await axios.get('http://localhost:3000/api/book/'+req.params.title)
  const books = response.data
  console.log(books);
  res.render('edit', {books: books })
})
app.post('/edit', async (req, res) => {
  const response =await axios.put('http://localhost:5000/api/book/'+ req.params.title +'/edit',req.body)
  res.redirect('/')
  console.log(response.message);
})

//server
app.listen('3000',()=>console.log('server run'))