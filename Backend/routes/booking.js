const express=require("express")
const { CreateBooking } = require("../controllers/user")
const authenticate = require("../middleware/authenticate")
const { getMyBooking, CancelBooking, AllBookings, ConfirmBooking } = require("../controllers/bookingControllers")
const { Checkout, Checkin } = require("../controllers/CheckinoutController")
const router=express.Router()

// router.post('/',authenticate,CreateBooking)
router.get('/all',authenticate,AllBookings)
router.get('/my',authenticate,getMyBooking)
router.patch('/confirm/:bookid',authenticate,ConfirmBooking)
router.patch('/cancel/:bookid',authenticate,CancelBooking)
router.patch('/checkin/:bookid',authenticate,Checkin)
router.patch('/checkout/:bookid',authenticate,Checkout)

module.exports=router