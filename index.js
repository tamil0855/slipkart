const express=require('express');
const auth=require('./route/auth');
const app=express(); // creating server
const kartroute=require('./route/kartroute');
const userKart=require('./route/userkart');

app.use(express.json()); // middleware: sent response in JS to JSON format
app.use('/api/v1/kart',kartroute);
app.use('/api/v1/kart/user',userKart);
app.use('/api/v1/kart/auth',auth);

app.listen(6000,()=>{
    console.log("listening to 6000 port");
});



