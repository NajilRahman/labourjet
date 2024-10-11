import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
function SelfPaymentMessage({data,chatid}) {
  return (
    <Row>
      <Col sm={6}>
      </Col>
      <Col sm={6}>
        <div className=' my-2 d-flex justify-content-end ms-4 text-center'>
          <section className="wrapper my-3 ">
            <div className=" mb-4 ">
              <div className="card" >
                <div className="card-body">
                  <h5 className="card-title mt-0">
                    <div className="text-dark" ><p>Payment Request</p></div>
                  </h5>
                  <big className="card-meta mb-2 d-block">{data.amount} INR</big>
                </div>
                
              </div>
            </div>
          </section>       </div>
      </Col>
    </Row>
  )
}

export default SelfPaymentMessage
