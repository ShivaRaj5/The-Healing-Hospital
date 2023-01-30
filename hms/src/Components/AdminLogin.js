import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../App';
const AdminLogin = () => {
    const {state,dispatch}=useContext(UserContext)
    const navigate=useNavigate()
    useEffect(()=>{
        if(localStorage.getItem("admin")==="true")
        navigate("/admin")
    })
    const [adminDetail,setAdminDetail]=useState({
        email:"",
        password:""
    })
    const inputChange=(e)=>{
        const name=e.target.name;
        const value=e.target.value;
        setAdminDetail({...adminDetail,[name]:value})
    }
    const adminLogin=async ()=>{
        try{
            const {email,password}=adminDetail;
            const data=await fetch("/admin/login",{
                method:'POST',
                headers:{
                    "content-type":"application/json"
                },
                body:JSON.stringify({email,password})
            })
            if(data.status===200){
                localStorage.setItem("admin",true);
                localStorage.removeItem("patient");
                localStorage.removeItem("doctor");
                dispatch({type:"USER",payload:true})
                alert("Login successfull!")
                navigate("/admin")
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
                <h1>Admin Login</h1>
                <div className="loginContent">
                    <div>
                        <input type="text" placeholder='Email' name='email' value={adminDetail.email} onChange={inputChange}/>
                    </div>
                    <div>
                        <input type="password" placeholder='Password' name='password' value={adminDetail.password} onChange={inputChange}/>
                    </div>
                    <button onClick={adminLogin}>Log IN</button>
                </div>
            </div>
        </div>
    </>
  )
}

export default AdminLogin;