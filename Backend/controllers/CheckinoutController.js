const Booking = require("../model/bookingModel");
const roomModel = require("../model/roomModel");

const Checkin=async(req,res)=>{
    try{
        const {bookid}=req.params;
        const booking=await Booking.findByIdAndUpdate({_id:bookid},{status:"check-in"}).populate("user","email name").populate("room","roomNumber type")
        const room=await roomModel.findByIdAndUpdate({_id:booking.room._id},{status:"Booked"})
        return res.status(201).json({success:true,data:booking})
    }
    catch(error){
        console.log(error)
        return res.status(500).json({data:"Something Went Wrong"})
    }
}

const Checkout=async(req,res)=>{
    try{
        const {bookid}=req.params;
        const booking=await Booking.findByIdAndUpdate({_id:bookid},{status:"check-out"}).populate("user","email name").populate("room","roomNumber type")
        const room=await roomModel.findByIdAndUpdate({_id:booking.room._id},{status:"Available"})
        return res.status(201).json({success:true,data:booking})
    }
    catch(error){
        return res.status(500).json({data:"Something Went Wrong"})
    }
}

module.exports={Checkin,Checkout}