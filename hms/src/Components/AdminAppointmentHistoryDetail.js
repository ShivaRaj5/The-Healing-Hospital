import React from 'react'

const AdminAppointmentHistoryDetail = (props) => {
    const cancelAppointment = () => {
        props.cancelAppointment(props.id);
    }

    const confirmAppointment = () => {
        props.confirmAppointment(props.id);
    }
    return (
        <>
            <tr>
                <td>{props.idx + 1}</td>
                <td>{props.doctorName}</td>
                <td>{props.patientName}</td>
                <td>{props.specialization}</td>
                <td>{props.fees}₹</td>
                <td>{props.date}</td>
                <td>{props.time}</td>
                <td>{props.status}</td>
                {
                    props.status==="Active"?
                    <td id='cc'><button type='button' onClick={cancelAppointment}>Cancel</button> / <button type='button' onClick={confirmAppointment}>Confirm</button></td>:<td>{props.status} By {props.via=="Admin"?"You":props.via}</td>
                }
            </tr>
        </>
    )
}

export default AdminAppointmentHistoryDetail;