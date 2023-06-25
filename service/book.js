const express = require('express')
const book = require('../model/book')
const route = express.Router()
const joi = require('joi')
const verifyisAdmin=require('../authentification')
//schema validate
const schemabook = joi.object({
    title: joi.string().required(),
    subject:joi.string().required()
})
//create book
route.post('/add', async (req, res) => {
    const {err} = schemabook.validate(req.body)
    if (err) 
        return res.status(400).json({ message:err.message})
    try {
        const newbook = new book(req.body)
        const saved = await newbook.save()
        return res.status(201).json({ message: 'saved', data: saved })
    } catch (err){
        return res.status(400).json({ message:err.message})
    }
})
//read book
route.get('/',async(req,res)=>{
    const books = await book.find()
    books ? res.status(200).send(books)
        :res.status(404).json({message:"not found"})
})
//read book from its id
route.get('/:author',async(req,res)=>{
    const books = await book.findOne({author:req.params.author})
    books ? res.status(200).json({data:books})
        :res.status(404).send({message:"not found"})
})
//update book
route.put('/:title/edit',async(req,res)=>{
    const books = await book.findOneAndUpdate({title:req.params.title},req.body,{new:true})
    books ? res.status(200).send({message:"updated",data:books})
        :res.status(404).send({message:"not found"})
})
//delete book
route.delete('/:title', verifyisAdmin, async (req, res) => {
    if (req.isAmin)
        return res.status(401).json({ message:'not allone'})
    const books = await book.findOneAndDelete({title:req.params.title})
    books ? res.status(200).json({message:"deleted"})
        :res.status(404).send({message:"not found"})
})

module.exports=route