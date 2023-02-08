const mongoose=require('mongoose'); // importing mongoose package

mongoose.connect('mongodb://localhost:27017/slipkart').then('Connected to mongodb!!!').catch('Not connected to DB'); // connection to mongodb

//creating schema

const kartSchema=new mongoose.Schema({
    id:{
        type:Number,
        required:true,
        unique:true
    },
    Pro_Name:String,
    Rate:Number
});

// creating model or collection

const KartModel=mongoose.model('KartModel',kartSchema);

// exporting methods to use in index js
exports.kartSchema=kartSchema;
exports.KartModel=KartModel;







