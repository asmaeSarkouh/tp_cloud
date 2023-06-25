const express = require('express')
const route = express.Router()
const user = require('../model/user')
const joi = require('joi')
const bcrypt = require('bcrypt')
const jwt=require('jsonwebtoken')
//schema validate
const schemauser = joi.object({
    email: joi.string().email().required(),
    username:joi.string().required(),
    password:joi.string().required().min(7),
})

//create user
route.post('/register', async (req, res) => {
    const {email,username,password}=req.body
    const { err } = schemauser.validate(req.body)
    if (err)
        return res.status(400).json({message:err.message})
    const checkuser = await user.findOne({ email})
    if (checkuser)
        return res.status(400).json({message:'user email exists'})
        const hashed = await bcrypt.hash(password, 10)
        const users = new user({ email,username, password: hashed })
        const saved = await users.save()
    res.status(201).json({ message: "saved", data: saved })
    console.log(saved);

})


//login user
route.post('/login',async(req,res)=>{
    let {email,password}=req.body
    if(email && password){
        checkuser=await user.findOne({email})
        if(checkuser)
        {
         if(await bcrypt.compare(password,checkuser.password)) 
           {
            res.status(200).json({message:'connecter'})
           }
           else{
            res.status(400).json({message:'email ou mot de passe invalide'})
           }
        }
        else
        {
            res.status(400).json({message:'email ou mot de passe invalide'})
        }
    }
    else{
        res.status(400).json({message:"champs sont obligatoire"})
    }
})

//read user
route.get('/', async (req, res) => {
    const users = await user.find()
    users ? res.status(200).send(users)
        : res.status(404).json({ message:"not found"})
})
module.exports=route