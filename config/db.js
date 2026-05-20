const mongoose = require('mongoose');
const env = require("dotenv");

env.config();

const connectDb = async()=>{

    try{

        await mongoose.connect(process.env.MONGODB);

        console.log("db connected")

    }catch(err){

        console.log(err);

    }
}

module.exports = connectDb;