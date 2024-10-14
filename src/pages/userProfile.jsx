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
    const [rating,setRating]=useState(0)

      //works
const [works,setWorks]=useState([])
    const {id}=useParams()
    const navi=useNavigate()
    useEffect(() => {
        //fetch userPost
        postData('fetchUserPost', {viewerid:id})
          .then(res => {
            setUserPost(res.data.reverse())
          })
    
      }, [reRender])

      useEffect(()=>{
        setLoading(true)
        postData('getWorksData',{id:_id})
        .then(res=>{
          setWorks(res.data.reverse())
          setRating(Math.round(res.data.reduce((prev,next)=>prev=prev+next.rating,0)/works.length))
          setLoading(false)
        })
      },[reRender])
    
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
  
                          <Col sm={12} className='ms-2 text-black '>{userData?.userName} {userData.userType=='employee'?<svg className='ms-2' style={{width:'30px'}} id="Capa_1" enable-background="new 0 0 512 512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><g><g><path d="m256 512c-66.012-37.684-225-151.29-225-377.76v-73.14h15c34.673 1.377 118.623-.163 201.68-55.548l8.32-5.552 8.32 5.552c83.159 55.444 167.314 56.779 199.424 55.607l17.256-.159v73.24c0 267.383-221.99 374.756-225 377.76z" fill="#f0f7ff"/></g><path d="m481 134.24v-73.24l-17.256.159c-32.109 1.172-116.265-.163-199.424-55.607l-8.32-5.552v512c3.01-3.005 225-110.379 225-377.76z" fill="#c7cfe1"/><g><g><path d="m256 443.38c-2.617-3-165-99.914-165-309.141v-13.374l13.286-2.432c50.859-5.874 99.507-21.196 144.58-45.571l7.134-3.852 7.134 3.853c45.073 24.375 93.721 39.697 144.58 45.571l13.286 1.524v13.374c0 205.199-162.252 306.898-165 310.048z" fill="#7ed8f6"/></g></g><path d="m421 133.332v-13.374l-13.286-1.523c-50.859-5.874-99.507-21.196-144.58-45.571l-7.134-3.854v374.37c2.748-3.151 165-104.849 165-310.048z" fill="#4895ff"/><g id="Shield_2_"><g><path d="m241 307.311-55.605-55.605 21.21-21.211 34.395 34.394 79.395-79.394 21.21 21.211z" fill="#f0f7ff"/></g></g><path d="m256 292.311 85.605-85.605-21.21-21.211-64.395 64.394z" fill="#c7cfe1"/></g></svg>:''} </Col>
                          {
            userData.userType=='employee'?
            <Col sm={12} className='text-center'>
                                     <span>
                                          <button  className='btn btn-white p-2'><i className={`fa-solid fa-star ${rating>0?'text-warning':''}`}></i></button>
                                          <button  className='btn btn-white p-2'><i className={`fa-solid fa-star ${rating>1?'text-warning':''}`}></i></button>
                                          <button  className='btn btn-white p-2'><i className={`fa-solid fa-star ${rating>2?'text-warning':''}`}></i></button>
                                          <button  className='btn btn-white p-2'><i className={`fa-solid fa-star ${rating>3?'text-warning':''}`}></i></button>
                                          <button  className='btn btn-white p-2'><i className={`fa-solid fa-star ${rating>4?'text-warning':''}`}></i></button>
                                          <span  style={{fontSize:'10px',fontWeight:'800'}}>{works.length}</span>
                                     </span>
                                    </Col>
                                    :<></>
          }
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
                              <Col><span className='d-block'>{userData?.jobRole}</span><span>Job</span></Col>
      
                              
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
