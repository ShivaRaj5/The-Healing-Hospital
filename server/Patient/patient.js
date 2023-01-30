const express=require("express");
const router=express.Router();
const bcrypt=require("bcryptjs");
const Patient=require("../Models/PatientSchema");
const authenticatePatient=require("../Authentication/PatientAuthentication");
//patient
router.get("/patient",authenticatePatient,(req,res)=>{
    res.send(req.rootUser);
})
router.post("/patient/registration",async (req,res)=>{
    try{
        const {name,email,phone,address,gender,password,cpassword}=req.body;
        const postData=new Patient({name,email,phone,address,gender,password,cpassword})
        const savedata=await postData.save();
        if(savedata)
            res.status(200).json({message:"Data has been saved!"});
        else
            res.status(500).json({message:"Data has not been saved for some reason!"});
    }catch(err){
        res.status(404).json({message:err});
    }
})
router.post("/patient/login",async (req,res)=>{
    try{
        const {email,password}=req.body;
        if(!email || !password)
            return res.status(403).json({message:"Please fill all the required fields!"})
        const data=await Patient.findOne({email})
        if(data){
            const token=await data.generateAuthToken();
            res.cookie("jwtoken",token,{
                expires:new Date(Date.now()+500000000),
                // httpOnly:true
            });
            // console.log(token);
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
    }
})
router.get("/patient/myprofile/:id",async (req,res)=>{
    try{
        const _id=req.params.id;
        const findUser=await Patient.findById({_id});
        if(findUser)
            res.status(200).send(findUser);
    }catch(err){
        res.status(404).json({message:err});
    }
})

router.patch("/patient/updateprofile/:id",async (req,res)=>{
    try{
        const _id=req.params.id;
        const findUser=await Patient.findByIdAndUpdate({_id},req.body,{new:true});
        if(findUser)
            res.status(200).json({message:"Your data has been updated successfully!"});
        else
            res.status(402).json({message:"Your data has not been updated!"});
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