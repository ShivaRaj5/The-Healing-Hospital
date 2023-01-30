import React from 'react'
const RemoveDoctorCard = (props) => {
    const deleteDoc=()=>{
        props.delDoctor(props.id)
    }
    return (
        <>
            
                <tr>
                    <td>{props.idx + 1}</td>
                    <td>{props.name}</td>
                    <td>{props.specialization}</td>
                    <td>{props.fees}₹</td>
                    <td>{props.date}</td>
                    <td><button className='fixbtn' onClick={deleteDoc}>Remove</button></td>
                </tr>
        </>
    )
}

export default RemoveDoctorCard