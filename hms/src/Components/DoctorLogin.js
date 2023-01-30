import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../App'
const DoctorLogin = () => {
    const {state,dispatch}=useContext(UserContext)
    const navigate=useNavigate()
    useEffect(()=>{
        if(localStorage.getItem("doctor")==="true")
            navigate("/doctor")
    })
    const [doctorDetail,setDoctorDetail]=useState({
        email:"",
        password:""
    })
    const inputChange=(e)=>{
        const name=e.target.name;
        const value=e.target.value;
        setDoctorDetail({...doctorDetail,[name]:value})
    }
    const doctorLogin=async ()=>{
        try{
            const {email,password}=doctorDetail;
            const data=await fetch("/doctor/login",{
                method:'POST',
                headers:{
                    "content-type":"application/json"
                },
                body:JSON.stringify({email,password})
            })
            if(data.status===200){
                localStorage.setItem("doctor",true);
                localStorage.removeItem("admin");
                localStorage.removeItem("patient");
                dispatch({type:"USER",payload:true})
                alert("Login successfull!")
                navigate("/doctor")
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
                <h1>Doctor Login</h1>
                <div className="loginContent">
                    <div>
                        <input type="text" placeholder='Email' name='email' value={doctorDetail.email} onChange={inputChange}/>
                    </div>
                    <div>
                        <input type="password" placeholder='Password' name='password' value={doctorDetail.password} onChange={inputChange}/>
                    </div>
                    <button onClick={doctorLogin}>Log IN</button>
                </div>
            </div>
        </div>
    </>
  )
}

export default DoctorLogin