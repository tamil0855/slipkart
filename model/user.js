const moongoose=require('mongoose');
const jwt=require('jsonwebtoken');

const userSchema= new moongoose.Schema({

    name:{
        type:String,
        required:true,
        minlength:5,
        maxlength:255

    },

    email:{
        type:String,
        required:true,
        minlength:5,
        maxlength:255,
        unique:true

    },

    password:{
        type:String,
        required:true,
        minlength:5,
        maxlength:255,
        unique:true

    },

    isAdmin:Boolean
})

//generate token method

userSchema.methods.generateAuthToken=function(){

    const token=jwt.sign({_id:this._id,isAdmin:this.isAdmin},('jwtwebtoken'));

    return token;
}

const UserKart=moongoose.model('UserKart',userSchema);

exports.UserKart=UserKart;
