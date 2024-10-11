import React, { useState } from 'react'
import PostCard from '../components/postCard';
import { useEffect } from 'react';
import { postData } from '../apiServices/apiServices';
import io, { Socket } from 'socket.io-client';
const endpoint='http://localhost:4000/'
function Home({userData,render}) {
  const id=JSON.parse(localStorage.getItem('user'))._id
  const [homePost,setHomePost]=useState([])
  const [reRender,setReRender]=useState('')




  
  useEffect(() => {
 if(userData?.follower)
 {
  postData('homePost',userData?.follower)
  .then(res=>{
    console.log(res.data)
    setHomePost(res.data)
})
 }
  }, [userData?.follower,reRender])

  return (
    <>
               {
               homePost.length>0?
               homePost?.map(obj=>(
                <PostCard card={obj} render={render} reRender={setHomePost}/>
              ))
              :<div style={{height:'100vh'}}  className='d-flex justify-content-center align-items-center'><h1 style={{display:'block'}} >No Post To Show</h1></div>
               }
    </>
  )
}

export default Home
