const express=require("express")
const authenticate = require("../middleware/authenticate")
const { getBookingCount, getBookingReport, getRoomOccupy } = require("../controllers/admincontroller")
const router=express.Router()

router.get('/dashboard',authenticate,getBookingCount)
router.get('/bookingReport',authenticate,getBookingReport)
router.get('/roomOccupy',authenticate,getRoomOccupy)

module.exports=router