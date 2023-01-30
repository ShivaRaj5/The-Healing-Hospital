import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import AdminAppointmentHistoryDetail from './AdminAppointmentHistoryDetail';

const AdminAppointmentHistory = () => {
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
    const [allData, setAllData] = useState([]);
    const getData = async () => {
        try {
            const data = await fetch("/appointmentdetails", {
                method: "GET",
                headers: {
                    "content-type": "application/json"
                }
            })
            const jsonData = await data.json();
            setAllData(jsonData);
        } catch (err) {
            alert(err);
        }
    }
    useEffect(() => {
        getData()
    }, [])
    const cancelAppointment = async (id) => {
        try {
            const status = "Cancelled";
            const via="Admin";
            const data = await fetch(`http://localhost:5000/admin/action/${id}`, {
                method: "PATCH",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({ status,via })
            })
            if (data.status === 200) {
                getData();
            }
            else
                console.log("Not successfull!")
        } catch (err) {
            console.log(err);
        }
    }
    const confirmAppointment = async (id) => {
        try {
            const status = "Confirmed";
            const via="Admin"
            const data = await fetch(`/admin/action/${id}`, {
                method: "PATCH",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({ status,via })
            })
            if (data.status == 200) {
                getData();
            }
            else
                console.log("Not successfull!")
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <>

            <div className="patientAppointmentHistory">
                <div className="patientAppointmentDetails">
                    <h1>Admin | Appointment History</h1>
                    <div className="patientAppointmentContent">
                        <table>
                            <thead>
                                <tr>
                                    <th>SNO.</th>
                                    <th>Doctor Name</th>
                                    <th>Patient Name</th>
                                    <th>Specialization</th>
                                    <th>Consultancy Fees</th>
                                    <th>Appointment Date</th>
                                    <th>Appointment Time</th>
                                    <th>Current Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allData.map((ele, idx, arr) => {
                                    return (
                                        <>
                                            <AdminAppointmentHistoryDetail id={ele._id} key={ele._id} idx={idx} doctorName={ele.doctorName} patientName={ele.patientName} specialization={ele.specialization} fees={ele.fees} date={ele.date} time={ele.time} status={ele.status} via={ele.via} confirmAppointment={confirmAppointment} cancelAppointment={cancelAppointment} />
                                        </>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminAppointmentHistory;