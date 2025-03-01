 
  const express= require("express");
  const ConnectDb=require("./config/database.js");
  const User= require("./models/user.js");
  
   const cookieParser= require ("cookie-parser");

   const jwt= require("jsonwebtoken");

   const userAuth = require("./middlewares/auth.middleware.js");

   
   const app=express();

  app.use(express.json());
  app.use(cookieParser());

  const authRouter= require("./routes/auth");
  const profileRouter= require("./routes/profile");
  const requestRouter=require("./routes/request");

  app.use("/", authRouter);
  app.use("/", profileRouter);
  app.use("/", authRouter);

  


  // get user by email
app.get("/user", async (req,res)=>{
    const email=req.body.emailId;
       try{
       const user= await User.find({emailId:email});
   
   if(!user){
    res.status(404).send("user not found");
   }else {
    res.send(user); 
   }
   
  }catch(err){
    res.status(400).send("something wend wrong");
  }

})




 app.patch("/user", async(req,res)=>{
  const userId=req.body.userId;
  const data=req.body;
    try{
        const user= await user.findByIdAndUpdate({_id:userId},data,{
          returnDocument:"after",
          runValidators:true
        });
         
        res.send("User updated successfully");
    }catch(err){
      res.status(400).send("Something went wrrong");
    }
 });



   ConnectDb().then(()=>{
    console.log("Database connected succesfully");
   }).catch((err)=>{
    console.error("Failed to conned with datbase");
   })
 

 app.listen(3000,()=>{
    console.log("Server is successfully listening on port 3000..");
 });
  







                                 




