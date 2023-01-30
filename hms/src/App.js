import React, { createContext, useReducer } from 'react'
import { Route, Routes } from 'react-router-dom';
import About from './Components/About';
import AddDoctor from './Components/AddDoctor';
import Admin from './Components/Admin';
import Contact from './Components/Contact';
import Doctor from './Components/Doctor';
import DoctorAppointements from './Components/DoctorAppointements';
import Home from './Components/Home';
import Navbar from './Components/Navbar';
import Patient from './Components/Patient';
import PatientAppointmentHistory from './Components/AdminAppointmentHistory';
import PatientAppointments from './Components/PatientAppointments';
import RemoveDoctor from './Components/RemoveDoctor';
import UpdateDoctorProfile from './Components/UpdateDoctorProfile';
import UpdatePatientProfile from './Components/UpdatePatientProfile';
import BookAppointment from './Components/BookAppointment';
import AdminLogin from './Components/AdminLogin';
import DoctorLogin from './Components/DoctorLogin';
import PatientLogin from './Components/PatientLogin';
import PatientRegistration from './Components/PatientRegistration';
import Logout from './Components/Logout';
import {initialState,reducer} from "../src/reducer/UseReducer";

export const UserContext = createContext();
const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      <UserContext.Provider value={{state,dispatch}}>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/admin' element={<Admin />} />
          <Route path='/admin/managepatients' element={<PatientAppointmentHistory />} />
          <Route path='/admin/adddoctor' element={<AddDoctor />} />
          <Route path='/admin/removedoctor' element={<RemoveDoctor />} />
          <Route path='/doctor' element={<Doctor />} />
          <Route path='/doctor/updateprofile' element={<UpdateDoctorProfile />} />
          <Route path='/doctor/appointments' element={<DoctorAppointements />} />
          <Route path='/patient' element={<Patient />} />
          <Route path='/patient/updateprofile' element={<UpdatePatientProfile />} />
          <Route path='/patient/checkappointments' element={<PatientAppointments />} />
          <Route path='/patient/bookappointment' element={<BookAppointment />} />
          <Route path='/admin/login' element={<AdminLogin />} />
          <Route path='/doctor/login' element={<DoctorLogin />} />
          <Route path='/patient/login' element={<PatientLogin />} />
          <Route path='/patient/registration' element={<PatientRegistration />} />
          <Route path='/logout' element={<Logout />} />
        </Routes>
      </UserContext.Provider>
    </>
  )
}

export default App