const express = require("express");

const app = express();

const db = require("./config/db");

const UserRouter = require("./routes/UserRouter");
app.use(express.json());
app.use(UserRouter);
const dns = require('dns');

dns.setServers(['8.8.8.8', '1.1.1.1']);


// connect db
db();


// server
app.listen(3000,()=>{

    console.log("server started")

})