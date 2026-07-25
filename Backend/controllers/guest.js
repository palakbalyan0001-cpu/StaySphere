const Users =require("../model/userModel")
const bcrypt =require("bcrypt")
const jwt= require("jsonwebtoken")
require('dotenv').config();
const postregister=async(req,res)=>{
    try{
        const data=req.body;
        const existedUser=await Users.findOne({email:data.email});
        if(existedUser){
            return res.status(200).json({success:false,message:"Already registered.Please login"})
        }
        const obj={
            ...data,password:await bcrypt.hash(data.password,10),role:"User"
        }
        const user=new Users(obj)
        await user.save();
        console.log(user);
        return res.status(200).json({success:true ,message:null})
    }
    catch(error){
        return res.status(500).json({success:false,message:error.message})
    }
}

const postlogin=async(req,res)=>{
    try{
        const {email,password}=req.body;
        const user=await Users.findOne({email:email})
       
        if (user){
           const match=await bcrypt.compare(password,user.password)
           console.log(match)
           if(match){
                 const payload = {
                    id: user._id,
                    role : user.role
                }
                const token = jwt.sign(payload, process.env.Secret_Key, { expiresIn: "2d" });
                return res.cookie('token', token, {
                    httpOnly: true,
                    maxAge:24 * 60 * 60 * 1000
                }).status(200).json({success:true,token:payload});
           }
           return res.status(404).json({success:false,message:"Incorrect Password",field:'password'})
        }
        return res.status(404).json({success:false,message:"Invalid Email",field:'email'})
    }
    catch(error){
        return res.status(500).json({
        success: false,
        message: error.message
    });

    }
}

const logout = async (req, res) => {
  res.cookie("token", "none", {
    expires: new Date(Date.now() + 5 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ success: true, message: "Logged out successfully" });
};

module.exports={postregister,postlogin,logout}