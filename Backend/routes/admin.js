const express=require("express")
const authenticate = require("../middleware/authenticate")
const { getBookingCount } = require("../controllers/admincontroller")
const router=express.Router()

router.get('/dashboard',authenticate,getBookingCount)

module.exports=router