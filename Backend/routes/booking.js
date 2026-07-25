const express=require("express")
const { CreateBooking } = require("../controllers/user")
const authenticate = require("../middleware/authenticate")
const { getMyBooking, CancelBooking } = require("../controllers/bookingControllers")
const router=express.Router()

router.post('/',authenticate,CreateBooking)
router.get('/my',authenticate,getMyBooking)
router.delete('/cancel/:id',authenticate,CancelBooking)

module.exports=router