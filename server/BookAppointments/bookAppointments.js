const appointments=require("../Models/BookAppointmentSchema");
const express=require("express");
const router=express.Router();
router.post("/patient/bookappointment",async (req,res)=>{
    try{
        const {patientName,patientEmail,patientPhone,doctorName,doctorEmail,doctorPhone,specialization,fees,date,time}=req.body;
        const data=new appointments({patientName,patientEmail,patientPhone,doctorName,doctorEmail,doctorPhone,specialization,fees,date,time});
        const saveData=await data.save();
        if(saveData)
            res.status(200).json({message:"Data has been saved"});
        else
            res.status(402).json({message:"Data has not been saved!"});
    }catch(err){    
        res.status(404).json({message:err});
    }
})
router.get("/appointmentdetails",async (req,res)=>{
    try{
        const getData=await appointments.find();
        res.status(200).send(getData);
    }catch(err){
        res.status(404).json({message:err});
    }
})

router.get("/appointmentdetails/:doctorEmail",async (req,res)=>{
    try{
        const doctorEmail=req.params.doctorEmail;
        const getData=await appointments.find({doctorEmail});
        res.status(200).send(getData);
    }catch(err){
        res.status(404).json({message:err});
    }
})

module.exports=router;