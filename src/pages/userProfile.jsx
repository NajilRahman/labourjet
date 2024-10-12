import { useEffect, useState } from 'react'
import React from 'react'
import { Row, Col, Badge } from 'react-bootstrap'
import {  useNavigate, useParams } from 'react-router-dom'
import { postData } from '../apiServices/apiServices'
import UserPostCard from '../components/userPostCard'
import Loading from '../components/spinner'
function UserProfile() {
    const _id=JSON.parse(localStorage.getItem('user'))._id
    const [userPost, setUserPost] = useState('')
    const [userData,setUserData]=useState('')
    const [ViewerData,setViewerData]=useState('')
    const [followed, setFolllowed] = useState(!userData?.follower?.includes(_id))
    const [reRender,setReRender]=useState('')
    const [loading,setLoading]=useState(true)
    const {id}=useParams()
    const navi=useNavigate()
    useEffect(() => {
        //fetch userPost
        postData('fetchUserPost', {viewerid:id})
          .then(res => {
            setUserPost(res.data.reverse())
          })
    
      }, [reRender])


    const followRequest=(reqType)=>{
        postData('followUpdate',{userData,viewerid:ViewerData._id,reqType})
        .then(res=>{
           setFolllowed(!followed)
        })

    }


  const  messageRedirect=()=>{
    postData('messageRedirect',{user:[id,_id]})
    .then(res=>{
        navi(`/message/${res.data._id}`)
    })
  }
   


    useEffect(() => {
        postData('user',{id:_id})
        .then(res=>{
            setViewerData(res.data)
        })
   if(id)
   {
    postData('findUserById',{id})
    .then(res=>{
        setUserData(res.data)
        setFolllowed(!res.data?.follower?.includes(_id))
        setLoading(false)
    })
   }
   
    
    }, [id,followed])
    
    return (
      <>
         { loading?<div style={{height:'70vh'}}  className='d-flex justify-content-center align-items-center'><Loading/></div>
         :
          <div className=' bg-white border-2 mb-2 px-3 py-2  w-100 rounded-1 text-center ' style={{ height: 'max-content' }}>
              <Row>
                  <Col sm={6}>
                      <Row>
                          <Col sm-12><img className='img-fluid rounded-pill' style={{ height: '150px', width: '150px' }} src={userData?.imgUrl} alt="" /></Col>
  
                          <Col sm={12} className='ms-2 text-black mb-4'>{userData?.userName} </Col>
                          <Col sm={12} className='ms-2 text-black  mb-2'><i class="fa-regular fa-envelope fa-lg me-2"></i>{userData?.email} </Col>
                          <Col sm={12} className='ms-2 text-black  mb-2'><i class="fa-solid fa-phone fa-lg me-2"></i>{userData?.phone}</Col>
                          <Col sm={12} className='ms-2 text-black  mb-2'><i class="fa-solid fa-envelopes-bulk fa-lg me-2"></i>{userData?.postal}</Col>
                          <Col sm={12} className='ms-2 text-black  mb-2'><i class="fa-solid fa-location-dot fa-lg me-2"></i>{userData?.state}</Col>
                      </Row>
                  </Col>
                  <Col sm={6} className='text-center mt-5'>
                      <Row >
                          <Col><span className='d-block'>{userPost?.length}</span><span>Posts</span></Col>
                          <Col><span className='d-block'>{userData?.follower?.length}</span><span>Followers</span></Col>
  
  
                         {
                          userData?.userType!=='user'?
                         <>
                              <Col><span className='d-block'>{userData?.job}</span><span>Job</span></Col>
      
                              
                              <Col sm={12} className='border-2 bg-light p-3 mt-4'>
                              <h5>Skills</h5>
      
                              {userData?.skills?.map(obj=>{
                                   <Badge pill bg="dark" className='py-3 px-3 my-2' >
                                   <span>{obj}</span><span style={{ cursor: 'pointer' }} className='ms-4'>X</span>
                                   </Badge>
                              })}
                             
                             
      
                          </Col>
                         </>
                      :<></>
                          
                         }
                      </Row>
                  </Col>
  
                         {
                        followed?
                        <Col sm={6}><button className='btn btn-primary p-1 mt-3 w-100' onClick={e=>followRequest('follow')}>Follow</button></Col>
  
                        :<Col sm={6}><button className='btn btn-primary p-1 mt-3 w-100' onClick={e=>followRequest('unfollow')}>unfollow</button></Col>
  
                         }
  
                  <Col sm={6}><button className='btn btn-success p-1 mt-3 w-100' onClick={messageRedirect} >Message</button></Col>
  
  
  
  
              </Row>
              <Row className='my-5    bg-white' >
          {
            userPost?.length > 0
              ?
              userPost?.map(obj => (
                <Col sm={3}><UserPostCard post={obj} reRender={setReRender} userData={userData} /></Col>
              ))
  
              : <h3 className='text-center  mt-5'>no post to show</h3>
          }
  
  
        </Row>
          </div>}
      </>
    )
}

export default UserProfile
