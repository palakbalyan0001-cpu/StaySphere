const mongoose=require("mongoose")
const paymentSchema=new mongoose.Schema({
    bookingId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Booking',
        required: true,
        index: true
    },
    guestId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    paymentId: {
        type: String,
        required: true
    },

    amount: {
        type: Number,
        required: true
    },

    status: {
        type: String,
        default: "Pending"
    },

    paymentDate: {
        type: Date,
        default: Date.now
    },
},
    {
        timestamps:true
    }
)
module.exports=mongoose.model("payment",paymentSchema)