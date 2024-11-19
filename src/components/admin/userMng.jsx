import React, { useState } from 'react'
import { deleteData } from '../../apiServices/apiServices';

function UserMng({data,setRender}) {

  return (
    <div>
      <h1 className='text-center mb-5'>User Management</h1>


      <table className='table table-responsive table-light table-hover'>
        <thead>
            <tr>
            <th>User Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Action</th>
            </tr>
        </thead>
        <tbody>
            {
                data.filter(item=>item.userType=='user').map(obj=>(
                    <tr>
                    <td>{obj.userName}</td>
                    <td>{obj.email}</td>
                    <td>{obj.phone}</td>
                    <td><button className='btn '><i class="fa-solid fa-trash text-danger fa-xl" onClick={()=>deleteData(`deleteUser/${obj._id}`).then(res=>{setRender(res.data); toast.success('user Deleted');})}></i></button></td>
                    </tr>
                ))
            }
           
        </tbody>
      </table>
    </div>
  )
}

export default UserMng
