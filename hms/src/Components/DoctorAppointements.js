import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import DoctorAppointmentDetail from './DoctorAppointmentDetail';

const DoctorAppointements = () => {
    const navigate = useNavigate();
    const [doctorEmail, setDoctorEmail] = useState("");
    const callDoctor = async () => {
        try {
            const res = await fetch("/doctor", {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                    "content-type": "application/json"
                },
                credentials: "include"
            })
            const data = await res.json();
            setDoctorEmail(data.email);
            if (res.status !== 200) {
                navigate("/doctor/login");
            }
        } catch (err) {
            console.log(err);
            navigate("/doctor/login");
        }
    }
    useEffect(() => {
        callDoctor();
    }, [])
    const [allData, setAllData] = useState([]);
    const getAllData = async () => {
        try {
            const getData = await fetch(`http://localhost:5000/appointmentdetails/${doctorEmail}`, {
                method: "GET",
                headers: {
                    "content-type": "application/json"
                }
            })
            const jsonData = await getData.json();
            setAllData(jsonData);
        } catch (err) {
            alert(err);
        }
    }
    useEffect(() => {
        getAllData();
    }, [allData])
    const cancelAppointment = async (id) => {
        try {
            const status = "Cancelled";
            const via="Doctor";
            const data = await fetch(`http://localhost:5000/doctor/action/${id}`, {
                method: "PATCH",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({ status,via })
            })
            if (data.status === 200) {
                // console.log("success")
                getAllData();
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
            const via="Doctor"
            const data = await fetch(`/doctor/action/${id}`, {
                method: "PATCH",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({ status,via })
            })
            if (data.status === 200) {
                // console.log("Success!")
                getAllData();
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
                <div className="patientAppointmentDetails patientAppointmentDetails1">
                    <h1>Doctor | Appointment History</h1>
                    <div className="patientAppointmentContent">
                        <table>
                            <thead>
                                <tr>
                                    <th>SNO.</th>
                                    <th>Patient Name</th>
                                    <th>Patient Email</th>
                                    <th>Patient Phone</th>
                                    <th>Appointment Date</th>
                                    <th>Appointment Time</th>
                                    <th>Appointment Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allData.length>0 && allData.map((ele, idx, arr) => {
                                    return (<>
                                        <DoctorAppointmentDetail key={ele._id} idx={idx} id={ele._id} patientName={ele.patientName} patientEmail={ele.patientEmail} patientPhone={ele.patientPhone} date={ele.date} time={ele.time} status={ele.status} via={ele.via} confirmAppointment={confirmAppointment} cancelAppointment={cancelAppointment}/>
                                    </>)
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DoctorAppointements