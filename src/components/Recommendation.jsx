import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { postData } from '../apiServices/apiServices';

function Recommendation({userData,render}) {
  const  [viewer,setViewer]=useState(JSON.parse(localStorage.getItem('user')))
  const [followed,setFolllowed]=useState(!userData?.follower?.includes(viewer._id))
  const navi=useNavigate()

  const followRequest=(reqType)=>{
    postData('followUpdate',{userData,viewerid:viewer._id,reqType})
    .then(res=>{
      setFolllowed(!followed)
      render(res)
    })

}
  return (
    <div className=' bg-light border-2 my-3 px-3 py-2  w-100 rounded-1 text-center shadow' style={{height:'max-content'}}>
<Row className=''>
    <Col sm-12><img className='img-fluid rounded-pill' style={{height:'60px',width:'60px'}} src={userData?.imgUrl} alt="" /></Col>
   
        <Col sm={12} className='ms-2 text-black '>{userData?.userName}{userData.userType=='employee'?<svg className='ms-2' style={{width:'30px'}} id="Capa_1" enable-background="new 0 0 512 512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><g><g><path d="m256 512c-66.012-37.684-225-151.29-225-377.76v-73.14h15c34.673 1.377 118.623-.163 201.68-55.548l8.32-5.552 8.32 5.552c83.159 55.444 167.314 56.779 199.424 55.607l17.256-.159v73.24c0 267.383-221.99 374.756-225 377.76z" fill="#f0f7ff"/></g><path d="m481 134.24v-73.24l-17.256.159c-32.109 1.172-116.265-.163-199.424-55.607l-8.32-5.552v512c3.01-3.005 225-110.379 225-377.76z" fill="#c7cfe1"/><g><g><path d="m256 443.38c-2.617-3-165-99.914-165-309.141v-13.374l13.286-2.432c50.859-5.874 99.507-21.196 144.58-45.571l7.134-3.852 7.134 3.853c45.073 24.375 93.721 39.697 144.58 45.571l13.286 1.524v13.374c0 205.199-162.252 306.898-165 310.048z" fill="#7ed8f6"/></g></g><path d="m421 133.332v-13.374l-13.286-1.523c-50.859-5.874-99.507-21.196-144.58-45.571l-7.134-3.854v374.37c2.748-3.151 165-104.849 165-310.048z" fill="#4895ff"/><g id="Shield_2_"><g><path d="m241 307.311-55.605-55.605 21.21-21.211 34.395 34.394 79.395-79.394 21.21 21.211z" fill="#f0f7ff"/></g></g><path d="m256 292.311 85.605-85.605-21.21-21.211-64.395 64.394z" fill="#c7cfe1"/></g></svg>:''}  </Col>
        
            
           
            
        {
                      followed?
                      <Col sm={6}><button className='btn btn-primary p-1 mt-3 w-100' onClick={e=>followRequest('follow')}>Follow</button></Col>

                      :<Col sm={6}><button className='btn btn-primary p-1 mt-3 w-100' onClick={e=>followRequest('unfollow')}>unfollow</button></Col>

                       }                <Col sm={6}><button className='btn btn-info p-1 mt-3 w-100' onClick={e=>navi(`/user/${userData?._id}`)} >View</button></Col>
          

   </Row>
</div>
  )
}

export default Recommendation;
