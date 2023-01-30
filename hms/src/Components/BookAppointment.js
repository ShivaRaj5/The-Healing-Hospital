import React, { useEffect, useState } from 'react'
import { json, useNavigate } from 'react-router-dom';

const BookAppointment = () => {
    const navigate=useNavigate();
    const [patientName,setPatientName]=useState("");
    const [patientEmail,setPatientEmail]=useState("");
    const [patientPhone,setPatientPhone]=useState("");
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
            const data=await res.json();
            setPatientName(data.name);
            setPatientEmail(data.email);
            setPatientPhone(data.phone);
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
    const [allDoctors, setAllDoctors] = useState([]);
    const getallDoctors = async () => {
        try {
            const getDoctors = await fetch("/doctor/allDoctors", {
                method: "GET",
                headers: {
                    "content-type": "application/json"
                }
            })
            const jsonData = await getDoctors.json();
            setAllDoctors(jsonData);
        } catch (err) {
            alert(err);
        }
    }
    useEffect(() => {
        getallDoctors();
    }, [])
    const [appointmentDetail, setAppointmentDetail] = useState({
        specialization: "",
        doctorname: "",
        address: "",
        fees: "",
        date: "",
        time: ""
    });
    const inputChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setAppointmentDetail({ ...appointmentDetail, [name]: value })
    }
    const [dc, setDc] = useState([]);
    const [doctorEmail,setDoctorEmail]=useState("");
    const [doctorPhone,setDoctorPhone]=useState("");
    const getData = async () => {
        const data = await fetch(`/doctor/${appointmentDetail.specialization}`, {
            method: "GET",
            headers: {
                "content-type": "application/json"
            }
        })
        const jsonData = await data.json();
        setDc(jsonData);
    }
    useEffect(() => {
        getData();
    }, [appointmentDetail.specialization])
    const [individualDoctor, setIndividualDoctor] = useState({});
    const [fees,setFees]=useState("");
    const [doctorName,setDoctorName]=useState("");
    const getDoctorBySpecialization = async () => {
        try {
            const getData = await fetch(`/doctor/${appointmentDetail.specialization}/${appointmentDetail.doctorname}`, {
                method: "GET",
                headers: {
                    "content-type": "application/json"
                }
            });
            const jsonData = await getData.json();
            setDoctorName(jsonData.name);
            setDoctorEmail(jsonData.email);
            setDoctorPhone(jsonData.contact);
            setFees(jsonData.fees);
            setIndividualDoctor(jsonData)
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        getDoctorBySpecialization();
    }, [appointmentDetail.doctorname])
    const [allDates, setAllDates] = useState([]);
    const getAllDates = async () => {
        try {
            const getData = await fetch(`/getDates/${appointmentDetail.specialization}/${appointmentDetail.doctorname}`, {
                method: "GET",
                headers: {
                    "content-type": "application/json"
                }
            });
            const jsonData = await getData.json();
            setAllDates(jsonData);
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        getAllDates();
    }, [appointmentDetail.doctorname])
    const [individualTime, setIndividualTime] = useState([]);
    const getDoctorAvailableTime = async () => {
        try {
            const times = await fetch(`/doctor/${appointmentDetail.specialization}/${appointmentDetail.doctorname}/${appointmentDetail.date}`, {
                method: 'GET',
                headers: {
                    "content-type": "application/json"
                }
            })
            const allTimes = await times.json();
            setIndividualTime(allTimes);
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        getDoctorAvailableTime();
    }, [appointmentDetail.date])
    const bookAppointment=async ()=>{
        try{
            const specialization=appointmentDetail.specialization;
            const date=appointmentDetail.date;
            const time=appointmentDetail.time;
            const postData=await fetch("http://localhost:5000/patient/bookappointment",{
                method:"POST",
                headers:{
                    "content-type":"application/json"
                },
                body:JSON.stringify({patientName,patientEmail,patientPhone,doctorName,doctorEmail,doctorPhone,specialization,fees,date,time})
            })
            if(postData.status===200){
                alert("Your appointment booking request has submitted successfully!")
                navigate("/patient/checkappointments");
            }
            else
                alert("Please try again after some time!");
        }catch(err){
            alert(err);
        }
    }
    return (
        <>
            <div className="addDoctorContainer">
                <div className="addDoctorDetails">
                    <h1>Book An Appointment</h1>
                    <div className="addDoctorContent">
                        <form>
                            <div className='form_group'>
                                <div>
                                    <label htmlFor="">Doctor Specialization</label>
                                </div>
                                <div>
                                    <select name="specialization" value={appointmentDetail.specialization} onChange={inputChange}>
                                        <option defaultChecked>Select</option>
                                        {allDoctors.length > 0 && allDoctors.map((ele, idx, arr) => {
                                            return (<>
                                                <option value={ele}>{ele}</option>
                                            </>
                                            )
                                        })}
                                    </select>
                                </div>
                            </div>
                            <div className='form_group'>
                                <div>
                                    <label htmlFor="">Doctor Name</label>
                                </div>
                                <div>
                                    <select name="doctorname" value={appointmentDetail.doctorname} onChange={inputChange}>
                                        <option defaultChecked>Select</option>
                                        {dc.length > 0 && dc.map((ele) => {
                                            return <option value={ele._id}>{ele.name}</option>
                                        })
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className='form_group'>
                                <div>
                                    <label htmlFor="">Doctor Clinic Address</label>
                                </div>
                                <div>
                                    <input type="text" placeholder='Doctor Clinic Address' name='address' value={individualDoctor.address} onChange={inputChange} />
                                </div>
                            </div>
                            <div className='form_group'>
                                <div>
                                    <label htmlFor="">Doctor Consultancy Fees</label>
                                </div>
                                <div>
                                    <input type="text" placeholder='Doctor Consultancy Fees' name='fees' value={individualDoctor.fees ? individualDoctor.fees + "₹" : null} onChange={inputChange} />
                                </div>
                            </div>
                            <div className='form_group'>
                                <div>
                                    <label htmlFor="">Date</label>
                                </div>
                                <div>
                                    <select name="date" id="" value={appointmentDetail.date} onChange={inputChange}>
                                        <option defaultChecked>Select</option>
                                        {allDates.length > 0 && allDates.map((ele, idx, arr) => {
                                            return (<><option value={ele}>{ele}</option></>)
                                        })}
                                    </select>
                                </div>
                            </div>
                            <div className='form_group'>
                                <div>
                                    <label htmlFor="">Select Time</label>
                                </div>
                                <div>
                                    <select name="time" id="" onChange={inputChange}>
                                        <option>select</option>
                                        {individualTime.length > 0 && individualTime.map((ele, idx, arr) => {
                                            return (<><option value={ele}>{ele}</option></>)
                                        })}
                                    </select>
                                </div>
                            </div>
                            <button type='button' onClick={bookAppointment}>Book Appointment</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BookAppointment;