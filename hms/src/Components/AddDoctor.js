import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TagsInput from './TagsInput'
const AddDoctor = () => {
  const navigate = useNavigate()
  const [doctorDetail, setDetailDoctor] = useState({
    specialization: "",
    name: "",
    address: "",
    fees: "",
    contact: "",
    availableDate:"",
    // availability: [
    //   {
    //     availableDate: "2015-10-20",
    //     availableTime: ["10pm","11pm","12pm"]
    //   }
    // ],
    email: "",
    password: "",
    cpassword: ""
  })

  const [mytags, setMyTags] = useState([]);
  const selectedTags = (tags) => {
    setMyTags(tags)
    return tags;
  };
  const inputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setDetailDoctor({ ...doctorDetail, [name]: value });
  }
  const addDoctor = async (e) => {
    e.preventDefault();
    try {
      const { specialization, name, address, fees, contact, email, password, cpassword } = doctorDetail;
      const availableDate=doctorDetail.availableDate;
      const availableTime=mytags;
      const availability={availableDate,availableTime};
      const addData = await fetch("http://localhost:5000/admin/adddoctor", {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({ specialization, name, address, fees, contact, availability, email, password, cpassword })
      })
      if (addData.status === 200) {
        alert("Doctor has been added successfully!");
        navigate("/admin/removeDoctor");
      }
      else if (addData.status === 500)
        alert("Please fill all the required fields!")
      else
        alert("Please try again!")
    } catch (err) {
      alert(err);
    }
  }
  
  return (
    <>
      <div className="addDoctorContainer">
        <div className="addDoctorDetails">
          <h1>Admin | Add Doctor</h1>
          <div className="addDoctorContent">
            <form>
              <div className='form_group'>
                <div>
                  <label htmlFor="">Doctor Specialization</label>
                </div>
                <div>
                  <input type="text" placeholder='Add Specialization' name='specialization' value={doctorDetail.specialization} onChange={inputChange} />
                </div>
              </div>
              <div className='form_group'>
                <div>
                  <label htmlFor="">Doctor Name</label>
                </div>
                <div>
                  <input type="text" placeholder='Doctor Name' name='name' value={doctorDetail.name} onChange={inputChange} />
                </div>
              </div>
              <div className='form_group'>
                <div>
                  <label htmlFor="">Doctor Clinic Address</label>
                </div>
                <div>
                  <input type="text" placeholder='Doctor Clinic Address' name='address' value={doctorDetail.address} onChange={inputChange} />
                </div>
              </div>
              <div className='form_group'>
                <div>
                  <label htmlFor="">Doctor Consultancy Fees</label>
                </div>
                <div>
                  <input type="text" placeholder='Doctor Consultancy Fees' name='fees' value={doctorDetail.fees} onChange={inputChange} />
                </div>
              </div>
              <div className='form_group'>
                <div>
                  <label htmlFor="">Doctor Contact No.</label>
                </div>
                <div>
                  <input type="text" placeholder='Doctor Contact No.' name='contact' value={doctorDetail.contact} onChange={inputChange} />
                </div>
              </div>
              <div className='form_group'>
                <div>
                  <label htmlFor="">Available Date</label>
                </div>
                <div>
                  <input type="date" placeholder='Select Date' name='availableDate' value={doctorDetail.availableDate} onChange={inputChange} />
                </div>
              </div>
              <div className='form_group'>
                <div>
                  <label htmlFor="">Available Time</label>
                </div>
                <div>
                  <TagsInput type={"time"} selectedTags={selectedTags}/>
                </div>
              </div>
              <div className='form_group'>
                <div>
                  <label htmlFor="">Doctor Email</label>
                </div>
                <div>
                  <input type="text" placeholder='Doctor Email' name='email' value={doctorDetail.email} onChange={inputChange} />
                </div>
              </div>
              <div className='form_group'>
                <div>
                  <label htmlFor="">Password</label>
                </div>
                <div>
                  <input type="text" placeholder='Password' name='password' value={doctorDetail.password} onChange={inputChange} />
                </div>
              </div>
              <div className='form_group'>
                <div>
                  <label htmlFor="">Confirm Password</label>
                </div>
                <div>
                  <input type="text" placeholder='Confirm Password' name='cpassword' value={doctorDetail.cpassword} onChange={inputChange} />
                </div>
              </div>
              <button type='button' onClick={addDoctor}>Add Doctor</button>
            </form>
          </div>
        </div>
      </div>
      
    </>
  )
}

export default AddDoctor