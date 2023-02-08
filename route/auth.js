const express=require('express');
const router=express.Router();
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const {UserKart}=require('../model/user');


router.post('/',async(req,res)=>{

    let user= await UserKart.findOne({email:req.body.email});
    if(!user) return res.status(400).send("Invalid email or password!!!");

    let validPassword=await bcrypt.compare(req.body.password,user.password);
    if (!validPassword) return res.status(400).send(':( Invalid email or password.');

    const token=user.generateAuthToken();
    res.send(token);
})

module.exports=router;
