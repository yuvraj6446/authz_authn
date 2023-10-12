const express=require("express");
const { login, singnup } = require("../controllers/Auth");
const { auth, isStudent, isAdmin } = require("../middlewares/auth");
const router=express.Router();







router.post("/login",login);
router.post("/signup",singnup);

// protected   routes


router.get("/student",auth,isStudent,(req,res)=>
{
    res.json({
        success:true,
        message:"welcome to the protected route for student ",
    })
})


router.get("/admin",auth,isAdmin,(req,res)=>
{
    res.json({
        success:true,
        message:"welcome to the protected route for admin ",
    })
})


router.get("/",(req,res)=>{
    console.log("normal get api");
    res.send("dfghjkl");

})

module.exports=router;
