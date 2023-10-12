const bcrypt= require("bcrypt");
const User=require("../models/User");
const mongoose=require("mongoose");
const jwt1=require("jsonwebtoken");

require("dotenv").config();


exports.singnup=async(req,res)=>{

    try{
        const {name,email,password,role}=req.body;
      
        if(!email)
        {
            console.log("no email");
        }

        const existingUser=await User.findOne({email});

        if(existingUser)
        {
            return res.status(400).json({
                success:true,
                message:"user already exist"

            })
        }

        let hashpassword;
        console.log("yha tk pohcha bhai");
        try{
            

            hashpassword=await bcrypt.hash(password,10);
        }
        catch(e)
        {
            console.log(e);
            return res.status(500).json({
                success:false,
                message:"error in hashing"

            })
        }

        const user=await User.create({
            name,email,password:hashpassword,role
        });
        
        res.status(200).json({
            success:true,
            // data:user,
            message:'user created successfully'
        })
    }
    catch(e){
        console.log("error in signup");
        console.error(e);
        return res.status(500).json({
            success:false,
            message:"user cannot be register because og failure in signup ,Please try again later"
        })

          
    }

}

exports.login=async (req,res)=>
{
    try{
        const {email,password}=req.body;
        if(!email||!password)
        {
            
            return res.status(400).json({
                success:false,
                message:"please fill all the details carefully"
            })
        }
        // console.log("ladle1");

        // check for the registered id

        const user=await User.findOne({email});
        // console.log("ladle2");

        if(!user)
        {
            return res.status(401).json({
                success:false,
                message:"user is not registered",
            })
        }

        // console.log("ladle3");
        // verify password &generate a jwt token 

        let payload;
        if(await bcrypt.compare(password,user.password))
        {
            // console.log("ladle4");

             payload={email:user.email,id:user._id,role:user.role};
            // 
        }

console.log("ladle5");
        let token=jwt1.sign(payload,process.env.JWT,{
            expiresIn:"2h"
        });

        
        console.log("ladle");
        user.toObject();
        user.token=token;
        // user.password=undefined;
        console.log("ladle");
        const options={expires:new Date(Date.now()+3*24*60*60*1000),httpOnly:true}
        res.cookie("token",token,options).status(200).json({
            success:true,
            token,user,message:"logged successfully"
        })

    }
    catch(e)
    {
        console.error(e);
        console.log("error in cookie");
    }
}


