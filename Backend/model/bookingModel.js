const mongoose=require("mongoose")
const BookingSchema=new mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId,ref:'Users',required:true},
    checkin:{type:Date,required:true},
    checkout:{type:Date,required:true},
    price:{type:Number,required:true},
    nights:{type:Number,required:true},
    status: {
      type: String,
      enum: ["pending", "confirmed", "checked-in", "checked-out", "cancelled"],
      default: "pending",
    },
    createdBy: {
      type: String,
      enum: ["customer", "receptionist", "admin"],
      default: "customer",
    },
})
const Booking=new mongoose.model("bookings",BookingSchema)
module.exports=Booking;