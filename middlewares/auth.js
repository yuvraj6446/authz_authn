const express=require("express");
const jwt=require("jsonwebtoken");
require("dotenv").config();

exports.auth=(req,res,next)=>
{
    try{
        const token=req.body.token||req.cookies.token||req.header("Authorization").replace("Bearer ","");
        if(!token)
        {
            return res.status(401).json({
                success:false,
                message:"token missing",
            })
        }

        // verify the token

        try{
            const decode=jwt.verify(token,process.env.JWT);
            console.log(decode);
            req.user=decode;
        }
        catch(er)
        {
            console.error(er);
            return res.status(401).json({
                success:false,
                
                message:"token is invalid"
            })
        }

        next();
    }
    catch(er)
    {
        console.error(er);
           return res.status(401).json({
            success:false,
            message:"something went wrong while verifying the token"
           }) 
    }
}


exports.isStudent=(req,res,next)=>{
    try{
        if(req.user.role!=="Student")
        {
            return res.status(401).json({
                success:false,
                message:"not for u this is a protected route for student"
            })
        }
        next();
    }
    catch(error)
    {
        return res.status(500).json({
            success:false,
            message:"user role is not matching"
        })
    }
}



exports.isAdmin=(req,res,next)=>{
    try{
        if(req.user.role!=="Admin")
        {
            return res.status(401).json({
                success:false,
                message:"not for u this is a protected route for Admin"
            })
        }
       



        next();
    }
    catch(error)
    {
        return res.status(500).json({
            success:false,
            message:"user role is not matching"
        })
    }
}


