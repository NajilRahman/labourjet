import React from 'react'
import { Row, Col } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { postData } from '../apiServices/apiServices'
function MessageCard({userData}) {
const navi=useNavigate()
const id=JSON.parse(localStorage.getItem('user'))._id
const  messageRedirect=()=>{
    postData('messageRedirect',{user:[userData._id,id]})
    .then(res=>{
        navi(`/message/${res.data._id}`)
    })
  }
  return (
    <div>
      <div className=' bg-light border-2 mb-2 px-3  py-2  w-100 rounded-1 text-center shadow' style={{ height: 'max-content' }}>
        <Row>
          <Col sm-12><img className='img-fluid rounded-pill' style={{ height: '60px', width: '60px' }} src={userData.imgUrl} alt="" /></Col>

          <Col sm={12} className='ms-2 text-black '> {userData.userName} </Col>
          <Col sm={12}><button className='btn btn-success p-1 mt-3 w-100' onClick={messageRedirect} >Message</button></Col>
          </Row>
      </div>    </div>
  )
}

export default MessageCard
