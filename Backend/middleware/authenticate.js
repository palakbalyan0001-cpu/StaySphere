const jwt=require("jsonwebtoken");

const authenticate=(req,res,next)=>{
    
    const token=req.cookies.token;
    if(!token){
         return res.status(401).json({
            success: false,message:"token is required"
        });
    }
    jwt.verify(token,process.env.Secret_Key,(err,user)=>{
        if(err){
            return res.status(403).send({message:"Invalid and expired token"});
        }
        req.user=user;
        next();
    })
    
}
module.exports=authenticate;