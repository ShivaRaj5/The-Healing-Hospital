const jwt=require("jsonwebtoken")
const Doctor=require("../Models/DoctorSchema");
const dotenv=require('dotenv');
dotenv.config({path:'config.env'});
const authenticateDoctor=async (req,res,next)=>{
    try{
        const token=req.cookies.jwtoken;
        const verifyToken=jwt.verify(token,process.env.SECRET_KEY);
        const rootUser=await Doctor.findOne({_id:verifyToken._id,"tokens.token":token});
        if(!rootUser)
            throw new Error("User not found!")
        req.rootUser=rootUser;
        req.token=token;
        next();
    }catch(err){
        console.log(err);
        res.status(401).json({message:"Unauthorized!"})
    }
}
module.exports=authenticateDoctor;