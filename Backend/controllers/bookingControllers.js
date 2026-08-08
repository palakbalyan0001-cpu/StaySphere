const Booking = require("../model/bookingModel");
const roomModel = require("../model/roomModel");

const getMyBooking=async(req,res)=>{
    try{
        const _id=req.user.id;
        const getbookings=await Booking.find({user:_id}).populate("user","email name").populate("room","roomNumber type")
        return res.status(201).json({success:true,data:getbookings})
    }
    catch(error){
        return res.status(404).json({success:false})
    }
}

const ConfirmBooking=async(req,res)=>{
    try{
        const {bookid}=req.params;
        const get=await Booking.findByIdAndUpdate({_id:bookid},{status:"confirm"},{new:true}).populate("user","email name").populate("room","roomNumber type")
        return res.status(201).json({success:true,data:get})
    }
    catch(error){
        console.log(error)
    }
}

const CancelBooking=async(req,res)=>{
    try{
        const {bookid}=req.params;
        const get=await Booking.findByIdAndUpdate({_id:bookid},{status:"cancelled"},{new:true}).populate("user","email name").populate("room","roomNumber type")
        console.log(room)
        return res.status(201).json({success:true,data:get})
    }
    catch(error){
        console.log(error)
    }
}

const AllBookings=async(req,res)=>{
    try{
        const {status}=req.query;
        const filter={}
        if(status){
            filter.status=status
        }
        const data=await Booking.find(filter).populate("user","email name").populate("room","roomNumber type")
        return res.status(201).json({success:true,data:data})
    }
    catch(error){
        console.log(error)
    }
}

module.exports={getMyBooking,ConfirmBooking,CancelBooking,AllBookings}