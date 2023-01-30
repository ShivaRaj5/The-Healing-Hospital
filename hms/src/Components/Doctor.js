import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ProfileIcon from '../Images/profile_pic.png'
import AppointmentIcon from '../Images/appointment_pic.png'
const Doctor = () => {
    const navigate=useNavigate();
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
    return (
        <>
            <div className="adminContainer">
                <div className="adminDetails">
                    <div className="adminContent">
                        <div className="doctorCard">
                            <img src={ProfileIcon} alt="logo" />
                            <div className="doctorManageDetails doctormargin">
                                <h1>My Profile</h1>
                                <p>Update | Change Profile</p>
                                <Link to="/doctor/updateprofile"><button>Update</button></Link>
                            </div>
                        </div>
                        <div className="doctorCard doctorsecondcard">
                            <img src={AppointmentIcon} alt="logo" />
                            <div className="doctorManageDetails doctormargin">
                                <h1>Manage Patients</h1>
                                <p>Confirm | Cancel An Appointment</p>
                                <Link to="/doctor/appointments"><button>Click Here</button></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Doctor