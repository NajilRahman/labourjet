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
      console.log(followed)
      setFolllowed(!followed)
      render(res)
    })

}
  return (
    <div className=' bg-light border-2 my-3 px-3 py-2  w-100 rounded-1 text-center shadow' style={{height:'max-content'}}>
<Row className=''>
    <Col sm-12><img className='img-fluid rounded-pill' style={{height:'60px',width:'60px'}} src={userData?.imgUrl} alt="" /></Col>
   
        <Col sm={12} className='ms-2 text-black '>{userData?.userName} </Col>
        
            
           
            
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
