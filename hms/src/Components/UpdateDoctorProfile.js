import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const UpdateDoctorProfile = () => {
    const navigate=useNavigate();
    const [oldData,setOldData]=useState({
        name:"",
        address:"",
        fees:"",
        email:"",
        contact:"",
        specialization:""
    })
    const inputChange=(e)=>{
        const name=e.target.name;
        const value=e.target.value;
        setOldData({...oldData,[name]:value});
    }
    const callDoctor=async ()=>{
        try{
            const res=await fetch("/doctor",{
                method:"GET",
                headers:{
                    "Accept":"application/json",
                    "content-type":"application/json"
                },
                credentials:"include"
            })
            const data=await res.json();
            setOldData(data);
            if(res.status!==200){
                navigate("/doctor/login");
            }
        }catch(err){
            console.log(err);
            navigate("/doctor/login");
        }
    }
    useEffect(()=>{
        callDoctor();
    },[])
    const updateDoctor=async (e)=>{
        e.preventDefault();
        try{
            const {name,address,fees,email,contact,specialization}=oldData;
            const updatData=await fetch(`/doctor/updateprofile/${oldData._id}`,{
                method:"PATCH",
                headers:{
                    "content-type":"application/json"
                },
                body:JSON.stringify({name,address,fees,email,contact,specialization})
            })
            if(updatData.status===200){
                alert("Your profile has been updated successfully!");
                navigate("/doctor");
            }
            else{
                alert("Please try again after some time!");
            }
        }catch(err){
            console.log(err);
        }
    }
    return (
        <>
            <div className="addDoctorContainer">
                <div className="addDoctorDetails">
                    <h1>Doctor | Update Profile</h1>
                    <div className="addDoctorContent">
                        <form>
                            <div className='form_group'>
                                <div>
                                    <label htmlFor="">Doctor Specialization</label>
                                </div>
                                <div>
                                    <input type="text" placeholder='Add Specialization' onChange={inputChange} name="specialization" value={oldData.specialization}/>
                                </div>
                            </div>
                            <div className='form_group'>
                                <div>
                                    <label htmlFor="">Doctor Name</label>
                                </div>
                                <div>
                                    <input type="text" placeholder='Doctor Name' onChange={inputChange} name="name" value={oldData.name}/>
                                </div>
                            </div>
                            <div className='form_group'>
                                <div>
                                    <label htmlFor="">Doctor Clinic Address</label>
                                </div>
                                <div>
                                    <input type="text" placeholder='Doctor Clinic Address' onChange={inputChange} name="address" value={oldData.address}/>
                                </div>
                            </div>
                            <div className='form_group'>
                                <div>
                                    <label htmlFor="">Doctor Consultancy Fees</label>
                                </div>
                                <div>
                                    <input type="text" placeholder='Doctor Consultancy Fees' onChange={inputChange} name="fees" value={oldData.fees}/>
                                </div>
                            </div>
                            <div className='form_group'>
                                <div>
                                    <label htmlFor="">Doctor Contact No.</label>
                                </div>
                                <div>
                                    <input type="text" placeholder='Doctor Contact No.' onChange={inputChange} name="contact" value={oldData.contact}/>
                                </div>
                            </div>
                            <div className='form_group'>
                                <div>
                                    <label htmlFor="">Doctor Email</label>
                                </div>
                                <div>
                                    <input type="text" placeholder='Doctor Email' onChange={inputChange} name="email" value={oldData.email}/>
                                </div>
                            </div>
                            <button type='button' onClick={updateDoctor}>Update</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UpdateDoctorProfile