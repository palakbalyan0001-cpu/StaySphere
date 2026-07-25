const express=require("express")
const authenticate = require("../middleware/authenticate")
const { CreateRooms, getrooms, deleteroom, editroom } = require("../controllers/roomsController")
const router=express.Router()

router.post('/create',authenticate,CreateRooms)
router.get('/',authenticate,getrooms)
router.patch('/edit/:id',authenticate,editroom)
router.delete('/:id',authenticate,deleteroom)

module.exports=router