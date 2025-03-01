
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth= async(req, res,next)=>{

   // Read the token from the req cookies
try{
const {token}= req.cookies;          
if(!token){
    throw new Error("token is not valid !!!!!!");
}

   // valdate the token

const decodedObj= await jwt.verify(token, "Devfusin@8957$12");
                        
   // find the username 

    const {id}= decodedObj;                

    const user= await User.findById(id);

    if(!user){
    throw new Error("Invalid user");
    }

       // attach the user in the request body

    req.user=user;
    next();

    }
    catch(err){
       res.status(400).send("Error"+ err.message);
    }

}

module.exports= userAuth;