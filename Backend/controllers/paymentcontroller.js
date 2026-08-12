const razorpayinstance=require('../config/razorpay')
const crypto=require("crypto");
const paymentModel = require('../model/paymentModel');
const Booking = require('../model/bookingModel');
const createOrder = async (req, res) => {
    try {
        const { price, bookingId } = req.body;
        const option = {
            amount: price * 100, 
            currency: "INR",
            receipt: bookingId,
        };
        const order = await razorpayinstance.orders.create(option);
        res.json(order);
    } catch (error) {
        return res.status(500).json(error);
    }
}

const verifyPayment = async (req, res) => {
    try {
        const { bookingId, razorpay_order_id, razorpay_payment_id, razorpay_signature, amount } = req.body;
        console.log(bookingId)
        const body = razorpay_order_id + "|" + razorpay_payment_id;
        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(body.toString())
            .digest("hex");

        if (expectedSignature !== razorpay_signature) {
            return res.status(400).json({ success: false, message: "Payment verification failed" });
        }

        await paymentModel.create({
            bookingId,
            guestId: req.user.id,
            paymentId: razorpay_payment_id,
            amount,
            status: "Success",
        });

        await Booking.findByIdAndUpdate(bookingId, { status: "confirm" });

        return res.json({ success: true, message: "Payment Successful" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Server error" });
    }
};


module.exports={createOrder,verifyPayment}