const express=require("express");

const app=express();

require("dotenv").config();

const port=process.env.port||5000;

app.use(express.json());
const cookieParser = require("cookie-parser");
app.use(cookieParser());

require("./config/database").connect();

const user=require("./routes/user");



app.use("/api/v1",user);




app.get('/',(req,res)=>
{
 res.send("ye chala");
})


app.listen(port,()=>{
    
    console.log(`App is on ${port}`);
    
})

// require("./config/database").connect();