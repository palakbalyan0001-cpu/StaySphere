const express=require("express")
const { CreateBooking } = require("../controllers/user")
const authenticate = require("../middleware/authenticate")
const router=express.Router()

router.post('/booking/:id',authenticate,CreateBooking)

module.exports=router