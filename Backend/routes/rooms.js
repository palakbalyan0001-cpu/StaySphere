const express=require("express")
const authenticate = require("../middleware/authenticate")
const { CreateRooms, getrooms, deleteroom, editroom, getroomById } = require("../controllers/roomsController")
const { upload } = require("../middleware/uploads")
const router=express.Router()

router.post('/create',authenticate,upload.array("RoomImages",3),CreateRooms)
router.get('/:id',getroomById)
router.get('/',getrooms)
router.patch('/edit/:id',upload.array("RoomImages",3),authenticate,editroom)
router.delete('/:id',authenticate,deleteroom)

module.exports=router