import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { postData } from '../apiServices/apiServices'
import toast from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'

function OtherPaymentMessage({data,chatid}) {
const navi=useNavigate()
 
  return (
    <Row>
     <Col sm={6}>
        <div className=' my-2 d-flex justify-content-start ms-4 text-center'>
        <section className="wrapper my-3 ">
            <div className=" mb-4 ">
              <div className="card" >
              <div className="card-body">
                  <h5 className="card-title mt-0">
                    <div className="text-dark" ><p>Payment Request</p></div>
                  </h5>
                  <img src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${data.msg}`} className='img-fluid' alt="" />
                  <big className="card-meta mb-2 d-block"><h3 className='text-dark mt-4'>{data.amount} Rs</h3></big>
                </div>
                <div className="card-footer">

                     
                        <a href={data.msg}><button className='btn btn-success w-100' >Pay</button></a>


                </div>
              </div>
            </div>
          </section>      
        </div>
     </Col>
   </Row>
  )
}

export default OtherPaymentMessage
