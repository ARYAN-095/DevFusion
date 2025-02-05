 
 const express= require("express");
 const ConnectDb=require("./config/database.js");
 const User= require("./models/user.js");
 
const bcrypt= require("bcrypt");
const validateSignUpData= require("./utils/validation");
const cookieParser= require("cookie-parser"); 
const jwt= require("jsonwebtoken");
const userAuth = require("./middlewares/auth.middlewares.js");


 const app=express();

 app.use(express.json());
  app.use(cookieParser());

 
app.post("/signup",  async (req,res)=>{

     try{

       // validation of data
       validateSignUpData(req);

       const {firstName, lastName, emailId, password}= req.body;

       const hashPassword= await bcrypt.hash(password, 10);

       const user = new User({
        firstName,
        lastName,
        emailId,
        password: hashPassword
       })
       await user.save();
       res.send("user added successfully");
          
     }catch(error){
           res.status(400).send("Error: "+ error.message);
     }
      
     
})

  app.post("/login", async(req, res)=>{
    try{
      const {emailId, password}= req.body;

      const user= await User.findOne({emailId:emailId});

      if(!user){
        throw new Error("Invalid credientils");
      }

      const isPasswordValid= await bcrypt.compare(password, user.password);

      if(isPasswordValid){
            
          const token = await jwt.sign({id:user._id},"Devfusin@8957$12");
          console.log(token);

        // create jwt token
        res.cookie("token", token); 


        // add the token to cookiew and send the resoponse back to the user


        res.send("Login Successful");
      }else {
        throw new Error("Invalid credianials");
      }
    }
    catch(err){
      res.status(400).send("Error: "+ err.message);
    }
  })

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

app.get("/profile", userAuth,  async (req,res)=>{

   try{
    const user= req.user;
    
     res.send(user);
   }catch(err){
    res.status(400).send("Error: "+ err.message);
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
  