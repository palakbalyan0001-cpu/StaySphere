const Booking=require("../model/bookingModel")

const CreateBooking=async(req,res)=>{
    try{
        console.log("correct")
        const data=req.body;
        const Createbooking={
            user:req.user.id,
            ...data,
            status:"pending"
        }
        console.log(Createbooking)
        const booked=new Booking(Createbooking)
        await booked.save();
        console.log(booked)
        return res.status(200).json({success:true})
    }
    catch(error){
        console.log(error)
    }
}
module.exports={CreateBooking}