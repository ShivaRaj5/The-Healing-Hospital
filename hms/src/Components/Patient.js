import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ProfileIcon from '../Images/profile_pic.png'
import BookAppointment from '../Images/book_appointment.png'
import CheckAppointment from '../Images/check_appointment.png'
const Patient = () => {
    const navigate=useNavigate();
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
                                <Link to="/patient/updateprofile"><button>Click Here</button></Link>
                            </div>
                        </div>
                        <div className="doctorCard">
                            <img src={BookAppointment} alt="logo" />
                            <div className="doctorManageDetails doctormargin">
                                <h1>Book Appointments</h1>
                                <p>Book An Appointment</p>
                                <Link to="/patient/bookappointment"><button>Click Here</button></Link>
                            </div>
                        </div>
                        <div className="doctorCard">
                            <img src={CheckAppointment} alt="logo" />
                            <div className="doctorManageDetails doctormargin">
                                <h1>Appointments</h1>
                                <p>Check Your Appointments Status</p>
                                <Link to="/patient/checkappointments"><button>Click Here</button></Link>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
    </>
  )
}

export default Patient