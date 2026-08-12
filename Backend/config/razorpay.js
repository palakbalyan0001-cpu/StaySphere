const razorpay=require("razorpay")
const razorpayinstance=new razorpay({
    key_id:process.env.RAZORPAY_KEY_ID,
    key_secret:process.env.RAZORPAY_KEY_SECRET
})

module.exports=razorpayinstance;