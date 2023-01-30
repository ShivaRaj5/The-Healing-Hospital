import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import DoctorIcon from '../Images/doctorg.png'
import PatientIcon from '../Images/patient_1.png'
const Admin = () => {
    const navigate=useNavigate();
    const callAdmin=async ()=>{
        try{
            const res=await fetch("/admin",{
                method:"GET",
                headers:{
                    "Accept":"application/json",
                    "content-type":"application/json"
                },
                credentials:"include"
            })
            const data=await res.json();
            if(res.status!==200){
                navigate("/admin/login");
            }
        }catch(err){
            console.log(err);
            navigate("/admin/login");
        }
    }
    useEffect(()=>{
        callAdmin();
    },[])
    return (
        <>
            <div className="adminContainer">
                <div className="adminDetails">
                    <div className="adminContent">
                        <div className="doctorCard doctorCard2">
                            <img src={DoctorIcon} alt="logo" />
                            <div className="doctorManageDetails">
                                <h1>Manage Doctors</h1>
                                <p>Add A Doctor | Remove A Doctor</p>
                                <div className="addremoveDoctorbuttons">
                                    <Link to="/admin/adddoctor"><button>Add</button></Link>
                                    <Link to="/admin/removeDoctor"><button>Remove</button></Link>
                                </div>
                            </div>
                        </div>
                        <div className="doctorCard doctorCard2">
                            <img src={PatientIcon} alt="logo" />
                            <div className="doctorManageDetails">
                                <h1>Manage Patients</h1>
                                <p>Confirm | Cancel An Appointment</p>
                                <Link to="/admin/managepatients"><button>Click Here</button></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Admin