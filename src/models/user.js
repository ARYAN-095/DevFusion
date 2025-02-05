const mongoose= require("mongoose");

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

module.exports= mongoose.model("User",userSchema);

 