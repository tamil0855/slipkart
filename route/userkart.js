const {UserKart}=require('../model/user');
const moongoose=require('mongoose');
const express=require('express');
const router=express.Router();
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const auth = require('../middleware/auth');



router.post('/',async(req,res)=>{
 let user= await UserKart.findOne({email:req.body.email});
 if(user) return res.status(400).send(`${req.body.email} already created!!`);
   
 user= new UserKart({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
        isAdmin:req.body.isAdmin
    })
const salt = await bcrypt.genSalt(10);
user.password= await bcrypt.hash(user.password,salt);
user=await user.save();
const token = user.generateAuthToken();
   res.header('x-auth-token', token).send(user);
})

module.exports=router;
