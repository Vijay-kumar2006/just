const express = require('express');
const User = require('../models/user');

const router = express.Router();

router.get('/', async(req, res)=>{
    try{
        const user = await User.find();
        res.status(200).json(user);
    }catch(err){
        res.status(500).json({message: "error fetching users", err});
    }
})

router.post('/', async(req, res)=>{
    const {name, email} = req.body;
    try{
        if(!name || !email){
            return res.status(400).json({message: "name and email are required"});
        }
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message: "user already exists"});
        }
        const user = await User.create({name, email});
       

        res.status(201).json(user);
    }catch(err){
        res.status(500).json({message: "error creating user", err});
    }
})

router.delete('/:id', async(req, res)=>{
    try{
        const id = req.params.id;
        const user = await User.findByIdAndDelete(id);
        if(!user){
            return res.status(404).json({message: "user not found"});
        }
        res.status(200).json({message: "user deleted successfully"});
    }catch(err){
        res.status(500).json({message: "error deleting user", err});
    }
}
)

module.exports = router;