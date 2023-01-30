const express=require("express");
const router=express.Router();
const Admin=require("../Models/AdminSchema");
const Doctor=require("../Models/DoctorSchema");
const appointments=require("../Models/BookAppointmentSchema");
const authenticateAdmin=require("../Authentication/AdminAuthentication");

//routers
router.get("/admin",authenticateAdmin,(req,res)=>{
    res.send(req.rootUser);
})
router.post("/admin/login",async (req,res)=>{
    try{
        const {email,password}=req.body;
        if(!email || !password)
            return res.status(403).json({message:"Please fill all the required fields!"})
        const data=await Admin.findOne({email})
        if(data){
            const token=await data.generateAuthToken();
            // console.log(token);
            res.cookie("jwtoken",token,{
                expires:new Date(Date.now()+500000000),
                // httpOnly:true
            });
            if(data.password===password)
                res.status(200).json({message:"Login Successfull!"});
            else    
                res.status(401).json({message:"Invalid Credentials!"});
        }
        else
            res.status(401).json({message:"Invalid Credentials!"});
    }catch(err){
        res.status(404).json({message:err});
        console.log(err);
    }
})
router.post("/admin/adddoctor",async (req,res)=>{
    try{
        const {specialization,name,address,fees,contact,availability,email,password,cpassword}=req.body;
        const postData=new Doctor({specialization,name,address,fees,contact,availability,email,password,cpassword})
        const savedata=await postData.save();
        if(savedata)
            res.status(200).json({message:"Data has been saved!"});
        else
            res.status(500).json({message:"Data has not been saved for some reason!"});
    }catch(err){
        res.status(404).json({message:err});
    }
})
router.get("/admin/removedoctor",async (req,res)=>{
    try{
        const data=await Doctor.find();
        res.status(200).send(data);
    }catch(err){
        res.status(404).json({message:err});
    }
})

router.delete("/admin/deletedoctor/:id",async (req,res)=>{
    try{
        const _id=req.params.id;
        const data=await Doctor.findByIdAndDelete({_id});
        if(data)
            res.status(200).json({message:"Data has been deleted successfully!"});
        else
            res.status(403).json({message:"Data has not been deleted for some reason!"})
    }catch(err){
        res.status(404).json({message:err});
    }
})
router.patch("/admin/action/:id",async (req,res)=>{
    try{
        const _id=req.params.id;
        const data=await appointments.findByIdAndUpdate({_id},req.body,{new:true});
        if(data)    
            res.status(200).json({message:"Success!"});
        else    
            res.status(403).json({message:"Failed!"})
    }catch(err){
        res.status(404).json({message:err});
    }
})
router.get("/logout",(req,res)=>{
    try{
        res.clearCookie("jwtoken",{path:'/'});
        res.status(200).json({message:"success"})
    }catch(err){
        res.status(404).json({message:err});
    }
})
module.exports=router;