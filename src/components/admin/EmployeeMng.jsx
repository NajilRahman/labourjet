import React, { useState } from 'react'
import { deleteData, postData } from '../../apiServices/apiServices'
import toast from 'react-hot-toast'

function EmployeeMng({data,setRender}) {

  return (
    <div>
      <h1 className='text-center mb-5'>employee Management</h1>


      <table className='table table-responsive table-light table-hover'>
        <thead>
            <tr>
            <th>User Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Job</th>
            <th>Update Status</th>
            <th>Action</th>
            </tr>
        </thead>
        <tbody>
            {
                data.filter(item=>item.userType=='employee').map(obj=>(
                    <tr>
                    <td>{obj.userName}</td>
                    <td>{obj.email}</td>
                    <td>{obj.phone}</td>
                    <td>{obj.jobRole}</td>
                    <td><button className={`btn ${obj.approvel=='accepted'?'btn-danger':'btn-success'}`} onClick={()=>{postData('changeStatus',obj).then(res=>{setRender(res.data); toast.success('Status Updated');obj.approvel=obj.approvel=='rejected'?'accepted':'rejected'})}}>{obj.approvel=='accepted'?'Reject':'Accept'}</button></td>
                    <td><button className='btn '><i class="fa-solid fa-trash text-danger fa-xl" onClick={()=>deleteData(`deleteUser/${obj._id}`).then(res=>{setRender(res.data); toast.success('employee Deleted');})}></i></button></td>
                    </tr>
                ))
            }
           
        </tbody>
      </table>
    </div>
  )
}

export default EmployeeMng
