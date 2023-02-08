const jwt=require('jsonwebtoken');

 function auth(req,res,next){

let token=req.header('x-auth-token');
if(!token) return res.status(400).send("enter token in request");


try{

  let decode=jwt.verify(token,'jwtwebtoken');
    req.user=decode;
    next();
}
catch(err){
    res.status(400).send('token passed is invalid!!');
}

}

module.exports=auth;