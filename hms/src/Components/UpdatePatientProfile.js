import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
const UpdatePatientProfile = () => {
    const navigate=useNavigate();
    const [oldData,setOldData]=useState({
        name:"",
        address:"",
        phone:"",
        gender:"",
        email:"",
    })
    const inputChange=(e)=>{
        const name=e.target.name;
        const value=e.target.value;
        setOldData({...oldData,[name]:value});
    }
   
    const callPatient=async ()=>{
        try{
            const res=await fetch("/patient",{
                method:"GET",
                headers:{
                    "Accept":"application/json",
                    "content-type":"application/json"
                },
                credentials:"include"
            })
            const data=await res.json();
            // console.log(data)
            setOldData(data);
            if(res.status!==200){
                navigate("/patient/login");
            }
        }catch(err){
            console.log(err);
            navigate("/patient/login");
        }
    }
    useEffect(()=>{
        callPatient();
    },[])
    const updatePatient=async (e)=>{
        e.preventDefault();
        try{
            const {name,address,phone,gender,email}=oldData;
            const updatData=await fetch(`/patient/updateprofile/${oldData._id}`,{
                method:"PATCH",
                headers:{
                    "content-type":"application/json"
                },
                body:JSON.stringify({name,address,phone,gender,email})
            })
            if(updatData.status===200){
                alert("Your profile has been updated successfully!");
                navigate("/patient");
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
                    <h1>Patient | Update Profile</h1>
                    <div className="addDoctorContent">
                        <form>
                            <div className='form_group'>
                                <div>
                                    <label htmlFor="">Update Name</label>
                                </div>
                                <div>
                                    <input type="text" placeholder='Update Name' name="name" value={oldData.name} onChange={inputChange}/>
                                </div>
                            </div>
                            <div className='form_group'>
                                <div>
                                    <label htmlFor="">Update Address</label>
                                </div>
                                <div>
                                    <input type="text" placeholder='Update Address'  name="address" value={oldData.address} onChange={inputChange}/>
                                </div>
                            </div>
                            <div className='form_group'>
                                <div>
                                    <label htmlFor="">Update phone</label>
                                </div>
                                <div>
                                    <input type="text" placeholder='Update phone'  name="phone" value={oldData.phone} onChange={inputChange}/>
                                </div>
                            </div>
                            <div className='form_group'>
                                <div>
                                    <label htmlFor="">Gender</label>
                                </div>
                                <div>
                                    <select id=""  name="gender" value={oldData.gender} onChange={inputChange}>
                                        <option defaultChecked>Select</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                            </div>
                            <div className='form_group'>
                                <div>
                                    <label htmlFor="">Update Email</label>
                                </div>
                                <div>
                                    <input type="text" placeholder='Update Email' name="email" value={oldData.email} onChange={inputChange}/>
                                </div>
                            </div>
                            <button onClick={updatePatient}>Update</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UpdatePatientProfile