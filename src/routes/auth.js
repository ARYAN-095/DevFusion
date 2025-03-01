const express= require('express');

const validateSignUpData = require("../utils/validation.js");
const User= require("../models/user.js");
const bcrypt= require("bcrypt");
const cookieParser= require("cookie-parser"); 
const jwt= require("jsonwebtoken");

const authRouter = express.Router();

authRouter.post("/signup",async (req,res)=>{
       
    try{

        validateSignUpData(req);

        const {firstName, lastName, emailId, password} = req.body;

        const hashPassword = await bcrypt.hash(password,10);

        const user= new User({
            firstName,
                lastName,
                emailId,
                password:hashPassword
        });

        await user.save();
        res.send("user added sucsessfully");
    } catch(error){
        res.status(400).send("Error: " + error.message);
    }
});


authRouter.get("/login",async (req,res)=>{

    try{
        const { emailId, password}= req.body;
          
        const user= await User.findOne({emailId:emailId});

        if(!user){
            throw new Error("Invalid credentials");
        }

        const isPassword= User.verifyPassword(password);

        if(isPassword){

            const token= User.getJWt();

            res.cookie("token", token);

            res.send("Login Successfull");


        }else{
            throw new Error("Invalid credientials");
        }

    }catch(error){
        res.status(400).send("Error" + error.message);
    }
})

module.exports= authRouter;