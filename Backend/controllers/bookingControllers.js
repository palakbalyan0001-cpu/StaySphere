const Booking = require("../model/bookingModel");

const getMyBooking=async(req,res)=>{
    try{
        const _id=req.user.id;
        const getbookings=await Booking.find({user:_id})
        return res.status(201).json({success:true,data:getbookings})
    }
    catch(error){
        return res.status(404).json({success:false})
    }
}

const CancelBooking=async(req,res)=>{
    try{
        const {id}=req.params;
        console.log(id)
        const userid=req.user.id;
        const get=await Booking.findOneAndUpdate({user:userid,_id:id},{status:"cancelled"})
        
        return res.status(201).json({success:true})
    }
    catch(error){
        console.log(error)
    }
}

module.exports={getMyBooking,CancelBooking}