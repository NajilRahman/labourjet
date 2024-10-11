import React, { useEffect, useState } from 'react'
import MessageCard from './MessageCard'
import { postData } from '../apiServices/apiServices'

function message() {
  const id=JSON.parse(localStorage.getItem('user'))._id
  const [users,setUsers]=useState([])
  useEffect(() => {
    postData('messageHistory',{id})
    .then((res)=>{
      setUsers(res.data)
        })
  }, [])
  
  return (
    <div id='scroller' sm={12} md={6} className=' bg-white  p-5 ' style={{ maxHeight: '100vh ',height:'100vh', overflowX: 'hidden', overflowY: 'scroll' }}>
      <h1>Message History</h1>
      {
        users.length>0?
        users?.map(obj=>(
          <MessageCard userData={obj}/>
        ))
        :<h3 className='text-center'>No History to show</h3>
      }

    </div>
  )
}

export default message
