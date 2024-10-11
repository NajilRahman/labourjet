import React, { useState,useEffect } from 'react'
import { postData } from '../apiServices/apiServices'
import { useNavigate } from 'react-router-dom'

function CommentMessage({comment,userid,reRender,handleClose}) {
const [user,setUser]=useState({})
const navi=useNavigate()
    useEffect(() => {
        postData('user',{id:userid})
        .then(res=>{
            setUser(res.data)
            console.log(res.data)
        })
    }, [])
    
  return (
    <div>
       <div className=' my-2 d-flex justify-content-start  bg-light rounded-3'>
                    <div className='text-start  px-3 py-2 text-black ' style={{overflow:'hidden',height:'auto',wordWrap: "break-word",fontWeight:'400',fontFamily:'sans-serif'}}>
                        <h6 className='p-1' onClick={e=>{navi(`/user/${user._id}`);reRender(`/user/${user._id}`);handleClose()}}>{user?.userName}</h6>
                     <p style={{fontSize:'calc(.8em + 0.3svw)'}} className='p-2'> {comment}  </p>
                    </div>
                   </div>
    </div>
  )
}

export default CommentMessage
