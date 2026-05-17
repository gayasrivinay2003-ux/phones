const express =require("express");
const app = express();
const mongoose = require("mongoose");
const User = require("./model/User")
app.use(express.json());
const dns = require('dns');
dns.setServers(['8.8.8.8', '1.1.1.1']);
mongoose.connect("mongodb+srv://gayasrivinay2003_db_user:aitam@cluster0.9zlzzga.mongodb.net/?appName=Cluster0")
.then(()=>{
    console.log("db connected")
})
app.get('/',(req,res)=>{
    res.send("hello world")
})
app.post("/phone/add",async(req,res)=>{
    try{
        const user  = new User(req.body);
        await user.save();
        res.send(user);
    }catch(err){
        res.send(err)
    }
})
app.get("/phone",async(req,res)=>{
    try{
        const user = await User.find();
        res.send(user)
    }catch(err){
        console.log(err)
    }
})
app.get("/phone/:id",async(req,res)=>{
    try{
        const user = await User.findById(req.params.id);
        res.send(user);
    }catch(err){
        console.log(err)
    }
})
app.put("/phone/update/:id",async(req,res)=>{
    try{
        const user = await User.findByIdAndUpdate(req.params.id,
            req.body,
        
        {new:true})
        res.send(user);
    }catch(err){

    }
})
app.delete("/phone/:id",async(req,res)=>{
 try{
    const user= await User.findByIdAndDelete(req.params.id);
    res.send("User deleted");

 }catch(err){
    console.log(err)
 }
})
app.listen(3000,()=>{
    console.log("server started")
})