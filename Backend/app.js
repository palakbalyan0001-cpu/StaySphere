const express=require("express")
const cors = require("cors")
const app=express()

const connectdb = require("./config/db")
const authenticate = require("./middleware/authenticate")
const cookieParser = require("cookie-parser");
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

const path = require("path");
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(express.json())
app.get("/",authenticate,(req,res)=>{
    return res.json({
        success:true,
        user:{
            id:req.user.id,
            role:req.user.role
        }
    })
})

const guestroute=require("./routes/guest")
const userroute=require("./routes/user")
const booking=require("./routes/booking")
const rooms=require("./routes/rooms")
const admin=require("./routes/admin")

app.use("/home",guestroute);
app.use("/booking",booking);
app.use("/rooms",rooms)
app.use("/user",userroute);
app.use("/admin",admin)

app.listen(3000,()=>{
    console.log("server started")
    connectdb()
})

