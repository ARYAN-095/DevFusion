const express= require("express");
const userAuth = require("../middlewares/auth.middleware");
const requestRouter=express.Router();

requestRouter.post("/sendConnectionRequest", userAuth, async(req,res)=>{
    const user= req.user;

    // sending a connection request
    console.log("sending a connection request");
    res.send(user.firstName+ "sent the connect request");
})

module.exports= requestRouter;