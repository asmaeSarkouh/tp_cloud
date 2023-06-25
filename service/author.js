const express = require('express')
const route = express.Router()
const author = require('../model/author')
//create author
route.post('/add', async (req, res) => {
    try {
    const newauthor = new author(req.body)
    const saved = await newauthor.save()
    res.status(201).json({message:'saved',data:saved})
    } catch (err) {
    res.status(400).json({Error:message.err})
    }
})
//read author
route.get('/', async (req, res) => {
    const authors = await author.find()
    authors?res.status(200).send(authors)
    :res.status(404).json({message:'not found'})
})
module.exports=route