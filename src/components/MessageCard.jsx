import React from 'react'
import { Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
function MessageCard() {
  return (
    <div>
      <div className=' bg-light border-2 mb-2 px-3 py-2  w-100 rounded-1 text-center ' style={{ height: 'max-content' }}>
        <Row>
          <Col sm-12><img className='img-fluid' style={{ height: 'auto', width: '60px' }} src="https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2264922221.jpg" alt="" /></Col>

          <Col sm={12} className='ms-2 text-black '>Najil Rahman Pm </Col>
          <Col sm={12}><Link to={'/message/:id'}><button className='btn btn-success p-1 mt-3 w-100' >Message</button></Link></Col>
        </Row>
      </div>    </div>
  )
}

export default MessageCard
