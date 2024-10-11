import React from 'react'
import WorkCard from './workCard'
import { Row,Col } from 'react-bootstrap'
function Work() {
  return (
    <div id='scroller' sm={12} md={6} className=' bg-white  p-5 ' style={{ maxHeight: '100vh ',height:'100vh', overflowX: 'hidden', overflowY: 'scroll' }}>
        <h1 className='text-black'>Assigned Works</h1>
     <Row>
        <Col sm={12} md={6}>     
         <WorkCard />
        </Col>
        <Col sm={12} md={6}>     
         <WorkCard />
        </Col> <Col sm={12} md={6}>     
         <WorkCard />
        </Col> <Col sm={12} md={6}>     
         <WorkCard />
        </Col> <Col sm={12} md={6}>     
         <WorkCard />
        </Col>
        
        
        
        
     </Row>
    </div>
  )
}

export default Work
