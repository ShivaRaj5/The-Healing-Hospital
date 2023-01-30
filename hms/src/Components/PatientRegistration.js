import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const PatientRegistration = () => {
    const navigate=useNavigate();
    const [patientData,setPatientData]=useState({
        name:"",
        email:"",
        phone:"",
        address:"",
        gender:"",
        password:"",
        cpassword:""
    })
    const inputEvent=(e)=>{
        const name=e.target.name;
        const value=e.target.value;
        setPatientData({...patientData,[name]:value})
    }
    const signupUser=async (e)=>{
        e.preventDefault();
        try{
            const {name,email,phone,address,gender,password,cpassword}=patientData;
            const addData=await fetch("http://localhost:5000/patient/registration",{
                method:"POST",
                headers:{
                    "content-type":"application/json"
                },
                body:JSON.stringify({name,email,phone,address,gender,password,cpassword})
            })
            if(addData.status===200){
                alert("You have been successfully registered!");
                navigate("/patient/login")
            }
            else if(addData.status===500)
                alert("Please fill all the required fields!")
            else
                alert("Please try again!")
        }catch(err){
            alert(err);
        }
    }
    return (
    <>
        <div className="addDoctorContainer">
                <div className="addDoctorDetails">
                    <h1>Patient Registration</h1>
                    <div className="addDoctorContent">
                        <form>
                            <div className='form_group'>
                                <div>
                                    <label htmlFor="">Name</label>
                                </div>
                                <div>
                                    <input type="text" placeholder='Name' name='name' value={patientData.name} onChange={inputEvent}/>
                                </div>
                            </div>
                            <div className='form_group'>
                                <div>
                                    <label htmlFor="">Email</label>
                                </div>
                                <div>
                                    <input type="text" placeholder='Email' name='email' value={patientData.email} onChange={inputEvent}/>
                                </div>
                            </div>
                            <div className='form_group'>
                                <div>
                                    <label htmlFor="">Phone</label>
                                </div>
                                <div>
                                    <input type="text" placeholder='Phone' name='phone' value={patientData.phone} onChange={inputEvent}/>
                                </div>
                            </div>
                            <div className='form_group'>
                                <div>
                                    <label htmlFor="">Address</label>
                                </div>
                                <div>
                                    <input type="text" placeholder='Address' name='address' value={patientData.address} onChange={inputEvent}/>
                                </div>
                            </div>
                            <div className='form_group'>
                                <div>
                                    <label htmlFor="">Gender</label>
                                </div>
                                <div>
                                    <select name="gender" id="" value={patientData.gender} onChange={inputEvent}>
                                        <option defaultChecked>Select</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                            </div>
                            <div className='form_group'>
                                <div>
                                    <label htmlFor="">Password</label>
                                </div>
                                <div>
                                    <input type="text" placeholder='Password' name='password' value={patientData.password} onChange={inputEvent}/>
                                </div>
                            </div>
                            <div className='form_group'>
                                <div>
                                    <label htmlFor="">Confirm Password</label>
                                </div>
                                <div>
                                    <input type="text" placeholder='Confirm Password' name='cpassword' value={patientData.cpassword} onChange={inputEvent}/>
                                </div>
                            </div>
                            <h3 className='loginOption'>Already have an account? <Link to="/patient/login">Log In</Link></h3>
                            <button onClick={signupUser}>Sign Up</button>
                        </form>
                    </div>
                </div>
            </div>
    </>
  )
}

export default PatientRegistration