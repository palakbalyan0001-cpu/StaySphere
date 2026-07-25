const mongoose=require('mongoose');
const userSchema=new mongoose.Schema({
    name:{type:Number,require:true},
    email:{type:String,require:true},
    password:{type:String,require:true},
    role: {
        type: String,
        enum: ["Admin", "User", "Staff"],
        default: "User"
    }
},
{timestamps:true}
);
const User= new mongoose.model("Users",userSchema);
module.exports=User;
