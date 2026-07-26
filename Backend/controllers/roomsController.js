const roomModel = require("../model/roomModel")

const CreateRooms=async(req,res)=>{
    try{
        const data=req.body
        console.log(req.files)
        const images = req.files.map(file => file.filename);
        
        const roominfo={
            ...data,
            images
        }
        const room=new roomModel(roominfo)
        await room.save();
        console.log(room)
        return res.status(200).json({success:true})
    }
    catch(error){
        return res.status(404).json({success:false,message:error})     
    }
}

const getrooms=async(req,res)=>{
    try{
       const rooms=await roomModel.find()
       return res.status(201).json({success:true,rooms}) 
    }
    catch(error){
        return res.status(404).json({success:false})       
    }
}

const getroomById=async(req,res)=>{
    try{
       const rooms=await roomModel.findOne({roomNumber:req.params.id})
       console.log(rooms)
       return res.status(201).json({success:true,rooms}) 
    }
    catch(error){
        return res.status(404).json({success:false})       
    }
}


const editroom=async(req,res)=>{
    try{
        const {id}=req.params;
        const images=req.files.map(file=>file.filename)
        const editdata={
            ...req.body,
            images
        }
        const found=await roomModel.findOneAndUpdate({roomNumber:id},{$set:editdata})
        return  res.status(201).json({success:true})
    }
    catch(error){
        return res.status(404).json({success:false,message:error})       
    }
}

const deleteroom=async(req,res)=>{
    try{
        const {id}=req.params;
        const found=await roomModel.findOneAndDelete({roomNumber:id})
        return res.status(201).json({success:true})
    }
    catch(error){
        return res.status(404).json({success:false})       
    }
}

module.exports={CreateRooms,getrooms,getroomById,deleteroom,editroom}