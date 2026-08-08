const Booking = require("../model/bookingModel");
const roomModel = require("../model/roomModel");
const User = require("../model/userModel");

const getBookingCount=async(req,res)=>{
    try{
        const [TotalBookings,TotalRooms,AvailableRooms,OccupiedRooms,MaintenanceRooms,TotalCustomers]
        =await Promise.all([
            Booking.countDocuments(),
            roomModel.countDocuments(),
            roomModel.countDocuments({status:"Available"}),
            roomModel.countDocuments({status:"Booked"}),
            roomModel.countDocuments({status:"Maintenance"}),
            User.countDocuments({role:"User"})
        ]);
        const data=await Booking.find().sort({createdAt:-1}).limit(5).populate("user","email name").populate("room","roomNumber type")
        return res.status(200).json({success:true,
            stats:{TotalBookings,TotalRooms,AvailableRooms,OccupiedRooms,MaintenanceRooms,TotalCustomers},
            data
        })

    }
    catch(error){
        return res.status(404).json({success:false})
    }
}

const getBookingReport=async(req,res)=>{
    try{
        const bookingReport=await Booking.aggregate([
            // {$match:{}}
            {$group:{
                _id:"$status",
                count:{$sum:1}
            }}
        ])
        return res.status(200).json({success:true,data:bookingReport})
    }
    catch(error){
        return res.status(404).json({success:false})
    }
}

const getRoomOccupy=async(req,res)=>{
    try{
        const roomOccupy=await roomModel.aggregate([
            // {$match:{}}
            {$group:{
                _id:"$status",
                count:{$sum:1}
            }}
        ])
        return res.status(200).json({success:true,data:roomOccupy})
    }
    catch(error){
        return res.status(404).json({success:false})
    }
}

module.exports={getBookingCount,getBookingReport,getRoomOccupy}