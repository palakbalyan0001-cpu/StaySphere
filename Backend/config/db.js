const mongoose=require('mongoose');
require('dotenv').config();
const connectdb=async()=>{
    try{
        await mongoose.connect(process.env.DATABASE_CON);
        console.log("Connected Successfully with DATABASE")
    }
    catch(err){
        console.log("Failed to Connect with DATABASE",err);
        process.exit(1);
    }
}
module.exports=connectdb;