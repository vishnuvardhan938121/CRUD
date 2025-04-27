const express= require("express") 
const mongoose = require("mongoose") 
const bodyParser=require("body-parser") 
const dotenv= require("dotenv") 
const cors= require("cors")  
const router=require("./routes/useroute.js")
const app=express() 
app.use(bodyParser.json()) 
app.use(cors())  
dotenv.config()   
const PORT=process.env.PORT 
const URL=process.env.MONGOURL   

mongoose.connect(URL).then(()=>
{
     console.log("DB CONNECTED SUCCESFULLY")
}).catch(error=>console.log(error))    

app.listen(PORT,(req,res)=>
{
  console.log(req) 
  console.log("server is running")
})   

app.use("/api",router)


