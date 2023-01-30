import React, { useEffect, useState } from 'react'
import RemoveDoctorCard from './RemoveDoctorCard';

const RemoveDoctor = () => {
    const [doctorData, setDoctorData] = useState([]);
    const getData = async () => {
        try {
            const data = await fetch("http://localhost:5000/admin/removedoctor", {
                method: "GET",
                headers: {
                    "content-type": "application/json"
                }
            })
            const jsonData = await data.json();
            setDoctorData(jsonData);
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        getData();
    }, [])
    const deleteDoctor = async (id) => {
        try {
            const deleteButton = await fetch(`http://localhost:5000/admin/deletedoctor/${id}`, {
                method: 'DELETE',
                headers: {
                    "content-type": "application/json"
                }
            })
            if (deleteButton.status === 200) {
                // console.log("deleted");
                getData();
            }
            else
                console.log("Not deleted");
        } catch (err) {
            alert(err);
        }
    }
    return (
        <>
            <div className="patientAppointmentHistory">
                <div className="patientAppointmentDetails">
                    <h1>Admin | Manage Doctors</h1>
                    <div className="patientAppointmentContent">
                        <hr />
                        <table>
                            <thead>
                                <tr>
                                    <th>SNO.</th>
                                    <th>Doctor Name</th>
                                    <th>Specialization</th>
                                    <th>Consultancy Fees</th>
                                    <th>Creation Date</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {doctorData.map((ele, idx, arr) => {
                                    return (
                                            <RemoveDoctorCard key={ele._id} idx={idx} id={ele._id} name={ele.name} specialization={ele.specialization} fees={ele.fees} date={ele.date} delDoctor={deleteDoctor}/>
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

export default RemoveDoctor