const mongoose= require("mongoose");
const bcrypt= require("bcrypt"); 

const userSchema= mongoose.Schema({

    firstName: {
        type:String,
        required:true,
        minlength:4,
        maxlength:50
    },

    lastName:{
        type:String,
        required:true,
    },

    emailId:{
        type:String,
        lowercase:true,
        required:true,
        unique:true,
        trim:true
    },

    password:{
        type:String,
       
    },

    age:{
        type:Number,
         min:18
    },

    gender:{
        type:String,
        validate(value){
            if(!["male","female","others"].includes(value)){
                throw new Error("Gender is not valid");
            }
        }
    },

    photourl:{
        type:String
    },

    about:{
        type:String,
        default: "This is a default about the user"
    },

    skills:{
        type:[String]
    }
   
},

{
    timestamps:true,
})

// associate the method with the user schema 
// never use array function in this because in javascripts "this" kwd is not work inside arrow function

userSchema.methods.getJWT= async function (){
    const user=this;

  const token = await jwt.sign({id:user._id},"Devfusin@8957$12",{
    expiresIn: "7d"
  });

  return token;
}


 userSchema.methods.verifyPassword= async function (passwordInputByUser){
       const user =this;
       const passwordHash= user.password;

       const isPasswordValid= await bcrypt.compare(passwordInputByUser, passwordHash);
                                                 // if you interchange then its not work 
                                                      // (userenteredpassword, actualpassword)

                return isPasswordValid;
 }   


module.exports= mongoose.model("User",userSchema);

 