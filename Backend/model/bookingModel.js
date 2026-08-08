const mongoose=require("mongoose")
const BookingSchema=new mongoose.Schema({
    user:{type:mongoose.Schema.Types.ObjectId,ref:'Users',required:true},
    room:{type:mongoose.Schema.Types.ObjectId,ref:'rooms',required:true},
    checkin:{type:Date,required:true},
    checkout:{type:Date,required:true},
    price:{type:Number,required:true},
    nights:{type:Number,required:true},
    status: {
      type: String,
      enum: ["pending", "confirm", "checked-in", "checked-out", "cancelled"],
      default: "pending",
    },
    createdBy: {
      type: String,
      enum: ["customer", "receptionist", "admin"],
      default: "customer",
    },
},
{ timestamps: true }
)
const Booking=new mongoose.model("bookings",BookingSchema)
module.exports=Booking;