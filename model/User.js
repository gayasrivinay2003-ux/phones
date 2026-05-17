const mongoose = require("mongoose");
const {type} = require("node:os");
const userschema = new mongoose.Schema({
    phone_name:{
        type:String,
    },
    brand:{
        type:String,
    },
    price:{
        type:Number,
    },
    ram:{
        type:String,
    },
    storage:{
        type:String
    }
});
module.exports = mongoose.model("User",userschema);