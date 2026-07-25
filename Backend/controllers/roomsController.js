const roomModel = require("../model/roomModel")

const CreateRooms=async(req,res)=>{
    try{
        const data=req.body
        console.log(data)
        const room=new roomModel(data)
        await room.save();
        return res.status(200).json({success:true})
    }
    catch(error){
        return console.log(error)
    }
}

const getrooms=async(req,res)=>{
    try{
        // console.log("getting")
       const rooms=await roomModel.find()
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
        console.log(req.body)
        const found=await roomModel.findOneAndUpdate({roomNumber:id},{$set:req.body})
        console.log(found)
        return  res.status(201).json({success:true})
    }
    catch(error){
        return res.status(404).json({success:false})       
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

module.exports={CreateRooms,getrooms,deleteroom,editroom}