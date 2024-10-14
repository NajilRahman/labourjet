import React, { useState } from 'react'
import PostCard from '../components/postCard';
import { useEffect } from 'react';
import { postData } from '../apiServices/apiServices';
import io from 'socket.io-client';
import Spinner from './spinner';
import Loading from './spinner';
const endpoint='http://localhost:4000/'
function Home({userData,render}) {
  const id=JSON.parse(localStorage.getItem('user'))._id
  const [homePost,setHomePost]=useState([])
  const [reRender,setReRender]=useState('')

  const [loading,setLoading]=useState(true)


  
  useEffect(() => {
 if(userData?.follower)
 {
  postData('homePost',userData?.follower)
  .then(res=>{
    setHomePost(res.data.reverse())
    setLoading(false)
})
 }
  }, [userData?.follower,reRender])

  return (
    <>{
      loading==true?
      <div style={{height:'100vh'}}  className='d-flex justify-content-center align-items-center'><Loading/></div>
      :
      
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
