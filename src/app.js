 
 const express= require("express");
 const app=express();

  app.use("/hello", (req,res)=>{
    res.send("Hello from server");
  })

  app.use("/test", (req,res)=>{
    res.send("Server is flying");
  })

  app.use("/test", (req,res)=>{
    res.send("Server is running");
  })



  app.use((req,res)=>{
    res.send("Hello eryone");
  })

  app.use("/",(req,res)=>{
    res.send("welcome to home page")
  })
 


 app.listen(3000,()=>{
    console.log("Server is successfully listening on port 3000..");
 });
  