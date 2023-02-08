const {kartSchema,KartModel}=require('../model/slipkart');
const express=require('express');
const router=express.Router();
const _=require('lodash');
const auth=require('../middleware/auth')


router.get('/',auth,async(req,res)=>{
    
let kart= await KartModel.find();
   if(!kart) return res.status(400).send("NO KART INFO, PLEASE CREATE A KART ");
    res.send(kart);
})

router.post('/',auth,async(req,res)=>{
// new used to create object. //kart=object,  KartModel=class
    let kart= new KartModel({
        id:req.body.id,
        Pro_Name:req.body.Pro_Name,
        Rate:req.body.Rate
    })
    //1 await 
    let ape= await KartModel.findOne({id:req.body.id});
    if(ape) return res.status(400).send(`Kart ID ${req.body.id} already created!!!!`);
    //2 await
    kart= await kart.save(); // saving the data using object
    // save() usedto save data in DB
    res.send(kart);
    
    
})

router.put('/:id',auth,async(req,res)=>{

    let ape= await KartModel.findOne({Pro_Name:req.body.Pro_Name});
     ape= await KartModel.findOne({Rate:req.body.Rate});
     
    if(ape) return res.status(400).send(`product ID, name & rate already updated!!!!`);
    
    const kart= await KartModel.findByIdAndUpdate(req.params.id,
        {
            id:req.body.id,
            Pro_Name:req.body.Pro_Name,
            Rate:req.body.Rate   
    },{new:true})

    
    res.send(kart);
})

router.delete('/:id',auth,async(req,res)=>{

    const kart= await KartModel.findByIdAndDelete(req.params.id);
    if(!kart) return res.status(400).send(`Given Kart ID ${req.params.id}  not exist!!!`);
    //   sendStatus= res.status(204).send("deleted!!");
      res.sendStatus(204);
});

router.delete('/',auth,async(req,res)=>{

    const kart= await KartModel.deleteMany();
    res.sendStatus(204);
})

router.get('/:id',auth,async(req,res)=>{
    const kart= await KartModel.findById(req.params.id);
    if(!kart) return res.status(400).send(`Given Kart ID ${req.params.id} not exist!!!`)
    res.send(kart);
})

module.exports=router;

