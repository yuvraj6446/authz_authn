const mongoose=require("mongoose");


require("dotenv").config();

exports.connect=()=>{

    console.log("a tk chala");
    mongoose.connect(process.env.URL,
        {
            useNewUrlParser:true,
            useUnifiedTopology:true
        })
        .then(()=>{console.log("db connection successful")})
        .catch((e)=>{
            console.log("error in db connection");
            console.error(e);
            process.exit(1);

        })

        console.log("a tk chala");
}

