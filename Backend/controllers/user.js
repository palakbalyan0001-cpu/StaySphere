const Booking=require("../model/bookingModel");
const roomModel = require("../model/roomModel");

const checkavailability = async (roomid, checkin, checkout) => {
    const booking = await Booking.findOne({
        room: roomid,
        status: { $in: ["pending", "confirmed","check-in"] },
        checkin: { $lt: new Date(checkout) },
        checkout: { $gt: new Date(checkin) }
    });

    return !booking;
};

const CreateBooking=async(req,res)=>{
    try{
        const data=req.body;
        const availability=await checkavailability(req.params.id,data.checkin,data.checkout)
        console.log(availability)
        if(availability==false){
            return res.status(404).json({success:false,message:"Room not available for these dates"})
        }
        const Createbooking={
            user:req.user.id,
            checkin:new Date(req.body.checkin).toISOString().split("T")[0],
            checkout:req.body.checkout.split("T")[0],
            room:req.params.id,
            ...data,
            // status:"confirm"
            status:"pending"
        }
        const id=req.params.id;
        const booked=new Booking(Createbooking)
        await booked.save();
        // await roomModel.findOneAndUpdate({_id:id},{status:"Booked"})
        return res.status(200).json({success:true})
    }
    catch(error){
        console.log(error)
    }
}
module.exports={CreateBooking}