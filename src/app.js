const express = require("express");
const mysql = require("mysql");
const route = require("./router/vehicle.router");

const bodyParser=require("body-parser")
const app=express()
const port=process.env.PORT||7000
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use("/driver",route)

app.listen(port,()=>{
    console.log(`server is running ${port}`);
})