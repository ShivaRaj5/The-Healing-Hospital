import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../App'
const PatientLogin = () => {
    const {state,dispatch}=useContext(UserContext)
    const navigate=useNavigate()
    useEffect(()=>{
        if(localStorage.getItem("patient")==="true")
            navigate("/patient")
    })
    const [patientData,setPatientData]=useState({
        email:"",
        password:""
    })
    const inputChange=(e)=>{
        const name=e.target.name;
        const value=e.target.value;
        setPatientData({...patientData,[name]:value})
    }
    const loginPatient=async ()=>{
        try{
            const {email,password}=patientData;
            const data=await fetch("/patient/login",{
                method:'POST',
                headers:{
                    "content-type":"application/json"
                },
                body:JSON.stringify({email,password})
            })
            if(data.status===200){
                localStorage.setItem("patient",true);
                localStorage.removeItem("doctor");
                localStorage.removeItem("admin");
                dispatch({type:"USER",payload:true})
                alert("Login successfull!")
                navigate("/patient")
            }
            else if(data.status===403)
                alert("Please fill all the required fields!");
            else if(data.status===401)
                alert("Invalid Credentials!")
            else
                alert("Fatal error!")
        }catch(err){
            alert(err);
        }
    }
    return (
    <>
        <div className="loginContainer">
            <div className="loginDetails">
                <h1>Patient Login</h1>
                <div className="loginContent">
                    <div>
                        <input type="text" placeholder='Email' name='email' value={patientData.email} onChange={inputChange}/>
                    </div>
                    <div>
                        <input type="password" placeholder='Password' name='password' value={patientData.password} onChange={inputChange}/>
                    </div>
                    <button onClick={loginPatient}>Log IN</button>
                </div>
                <h3 className='signupOption'>Don't have an account yet? <Link to="/patient/registration">Sign Up</Link></h3>
            </div>
        </div>
    </>
  )
}

export default PatientLogin