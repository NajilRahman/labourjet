import React, { useEffect, useState } from 'react'
import MessageCard from './MessageCard'
import { postData } from '../apiServices/apiServices'
import Loading from './spinner'

function Message() {
  const id=JSON.parse(localStorage.getItem('user'))._id
  const [users,setUsers]=useState([])
  const [loading,setLoading]=useState(true)


  useEffect(() => {
    postData('messageHistory',{id})
    .then((res)=>{
      setUsers(res.data.reverse())
      setLoading(false)
        })
  }, [])
  
  return (
    <div id='scroller ' sm={12} md={6} className=' bg-white  p-5 ' style={{ maxHeight: '100vh ',height:'100vh', overflowX: 'hidden', overflowY: 'scroll' }}>
      
      {  loading?<Loading/>
        :
        
          users.length>0?
          users?.map(obj=>(
            <MessageCard userData={obj}/>
          ))
          :<h3 className='text-center'>No History to show</h3>
        
  }
      
      
</div>
  )
}

export default Message
