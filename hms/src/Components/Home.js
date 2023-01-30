import React from 'react'
import { Link } from 'react-router-dom'
import PatientImg from '../Images/patient.png'
import DoctorImg from '../Images/doctor.png'
import AdminImg from '../Images/admin.png'
const Home = () => {
  let d=false;
  let p=false;
  let a=false;
  if(localStorage.getItem("doctor")==="true")
    d=true;
  else if(localStorage.getItem("patient")==="true")
    p=true;
  else if(localStorage.getItem("admin")==="true")
    a=true;
  return (
    <>
      <div className="homeContainer">
        <div className="homeContent">
          <div className="homeDetails">
            <div className="homeCard">
              <img src={PatientImg} alt="img" />
              <div className="homeDesc">
                <h1>Patient</h1>
                <p>Register & Book appointment</p>
                {((!d && !p && !a) || p)?<Link to="/patient/login"><button>Click Here</button></Link>:null}
              </div>
            </div>
            <div className="homeCard">
              <img src={DoctorImg} alt="img" />
              <div className="homeDesc">
                <h1>Doctor</h1>
                <p>Login To Cure Patients</p>
                {((!d && !p && !a) || d)?<Link to="/doctor/login"><button>Click Here</button></Link>:null}
              </div>
            </div>
            <div className="homeCard">
              <img src={AdminImg} alt="img" />
              <div className="homeDesc">
                <h1>Admin</h1>
                <p>Login To Manage Patients</p>
                {((!d && !p && !a) || a)?<Link to="/admin/login"><button>Click Here</button></Link>:null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home