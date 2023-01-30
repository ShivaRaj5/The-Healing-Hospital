import React, { useEffect, useState } from 'react'

const PatientAppointments = () => {
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
    return (
        <>
            <div className="patientAppointmentHistory">
                <div className="patientAppointmentDetails pa">
                    <h1>My Appointments History</h1>
                    <div className="patientAppointmentContent">
                        <table>
                            <thead>
                                <tr>
                                    <th>SNO.</th>
                                    <th>Doctor Name</th>
                                    <th>Specialization</th>
                                    <th>Consultancy Fees</th>
                                    <th>Appointment Date</th>
                                    <th>Appointment Time</th>
                                    <th>Current Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {allData.map((ele, idx, arr) => {
                                    return (<>
                                        <tr>
                                            <td>{idx + 1}</td>
                                            <td>{ele.doctorName}</td>
                                            <td>{ele.specialization}</td>
                                            <td>{ele.fees}₹</td>
                                            <td>{ele.date}</td>
                                            <td>{ele.time}</td>
                                            <td>{ele.status}</td>
                                        </tr>
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

export default PatientAppointments