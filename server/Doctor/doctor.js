const express=require("express");
const router=express.Router();
const bcrypt=require("bcryptjs");
const Doctor=require("../Models/DoctorSchema");
const appointments=require("../Models/BookAppointmentSchema");
const authenticateDoctor=require("../Authentication/DoctorAuthentication");
//router
router.get("/doctor",authenticateDoctor,(req,res)=>{
    res.send(req.rootUser);
})
router.post("/doctor/login",async (req,res)=>{
    try{
        const {email,password}=req.body;
        if(!email || !password)
            return res.status(403).json({message:"Please fill all the required fields!"})
        const data=await Doctor.findOne({email})
        if(data){
            const token=await data.generateAuthToken();
            // console.log(token)
            res.cookie("jwtoken",token,{
                expires:new Date(Date.now()+500000000),
                // httpOnly:true
            });
            const isMatch=await bcrypt.compare(password,data.password);
            if(isMatch)
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
router.get("/doctor/allDoctors",async (req,res)=>{
    try{
        const getDoctor=await Doctor.find();
        const a=new Set();
        getDoctor.map((ele,idx,arr)=>{
            a.add(ele.specialization);
        })
        const ar=new Array();
        for (const item of a) {
            ar.push(item)
        }
        res.send(ar);
    }catch(err){
        res.status(404).json({message:err});
    }
})
router.get("/doctor/:specialization",async (req,res)=>{
    try{
        const specialization=req.params.specialization;
        const getDoctor=await Doctor.find({specialization});
        res.send(getDoctor);
    }catch(err){
        res.status(404).json({message:err});
    }
})
router.get("/doctor/:specialization/:id",async (req,res)=>{
    try{
        const _id=req.params.id;
        const specialization=req.params.specialization;
        const getDoctor=await Doctor.find({_id,specialization});
        res.send(getDoctor[0]);
    }catch(err){
        res.status(404).json({message:err});
    }
})
router.get("/doctor/:specialization/:id/:date",async (req,res)=>{
    try{
        const _id=req.params.id;
        const specialization=req.params.specialization;
        const date=req.params.date;
        const getDoctor=await Doctor.find({_id,specialization});
        const doctorData=getDoctor[0];
        const arrData=doctorData.availability;
        const availableTime=[];
        arrData.map((ele,idx,arr)=>{
            if(ele.availableDate===date){
                for(let i=0;i<ele.availableTime.length;i++){
                    availableTime.push(ele.availableTime[i]);
                }
            }
        })
        res.send(availableTime);
    }catch(err){
        res.status(404).json({message:err});
    }
})

router.get("/getDates/:specialization/:id",async (req,res)=>{
    try{
        const _id=req.params.id;
        const specialization=req.params.specialization;
        const getDoctor=await Doctor.find({_id,specialization});
        const singleDoctor=getDoctor[0];
        const arrData=singleDoctor.availability;
        const allDates=[];
        arrData.map((ele,idx,arr)=>{
            // console.log(ele);
            allDates.push(ele.availableDate);
        })
        res.send(allDates);
    }catch(err){
        res.status(404).json({message:err});
    }
})
router.patch("/doctor/updateprofile/:id",async (req,res)=>{
    try{
        const _id=req.params.id;
        const updateDoctor=await Doctor.findByIdAndUpdate({_id},req.body,{new:true})
        if(updateDoctor)
            res.status(200).json({message:"Your profile has been updated successfully!"});
        else
            res.status(403).json({message:"Please try again after sometime!"})
    }catch(err){
        res.status(404).json({message:err});
    }
})
router.patch("/doctor/action/:id",async (req,res)=>{
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