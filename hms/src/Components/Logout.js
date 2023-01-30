import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../App'
const Logout = () => {
    const {state,dispatch}=useContext(UserContext)
    const navigate=useNavigate();
    const logout=async ()=>{
        try{
            const data=await fetch("/logout",{
                method:"GET",
                headers:{
                    "Accept":"application/json",
                    "content-type":"application/json"
                },
                credentials:"include"
            })
            if(data.status===200){
                dispatch({type:"USER",payload:false})
                if(localStorage.getItem("patient")==="true"){
                    localStorage.removeItem("patient");
                }
                else if(localStorage.getItem("doctor")==="true"){
                    localStorage.removeItem("doctor");
                }
                else if(localStorage.getItem("admin")==="true"){
                    localStorage.removeItem("admin");
                }
                alert("You have been logged out successfully!");
                navigate('/');
            }
        }catch(err){
            console.log(err);
        }
    }
    useEffect(()=>{
        logout();
    },[])
    return (
    <>
        <div className="logoutContainer">
            <h1>Loading...</h1>
        </div>
    </>
  )
}

export default Logout