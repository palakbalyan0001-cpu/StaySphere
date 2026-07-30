const Booking = require("../model/bookingModel");
const roomModel = require("../model/roomModel");
const User = require("../model/userModel");

const getBookingCount=async(req,res)=>{
    try{
        const [TotalBookings,TotalRooms,AvailableRooms,Occupiedrooms,Maintenancerooms,TotalCustomers]
        =await Promise.all([
            Booking.countDocuments(),
            roomModel.countDocuments(),
            roomModel.countDocuments({status:"Available"}),
            roomModel.countDocuments({status:"Booked"}),
            roomModel.countDocuments({status:"Maintenance"}),
            User.countDocuments({role:"User"})
        ]);
        return res.status(200).json({success:true,
            stats:{TotalBookings,TotalRooms,AvailableRooms,Occupiedrooms,Maintenancerooms,TotalCustomers}
        })
    }
    catch(error){
        return res.status(404).json({success:false})
    }
}

module.exports={getBookingCount}