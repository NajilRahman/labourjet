import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

function SelfMessage({message}) {
  return (
       
 <Row>
  <Col sm={6}>
  </Col>
   <Col sm={6}>
      <div className=' my-2 d-flex justify-content-end ms-4 '>
       <div className='text-start  px-3 py-2 text-black  rounded-3 shadow' style={{overflow:'hidden',height:'auto',wordWrap: "break-word",background:'#5dc1e8',fontWeight:'400',fontFamily:'sans-serif'}}>
        <p style={{fontSize:'calc(.8em + 0.3svw)'}}>  {message.msg}  </p>
       </div>
      </div>
   </Col>
 </Row>
  )
}
export default SelfMessage
