const express=require("express")
const { postregister,logout, postlogin} = require("../controllers/guest")
const router=express.Router()

router.post("/register",postregister)
router.post("/login",postlogin)
router.post("/logout",logout)


module.exports=router