import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { postData } from '../apiServices/apiServices'
import toast from 'react-hot-toast'

function OthersWorkReq({data,chatid}) {

  const workStatusUpdate=(req)=>{
    if(req=='Approve')
    {
      postData('workStatusUpdate',{status:'Approved',chatid,workid:data.workid})
      .then(res=>{
        toast.success('Work Approved')
        console.log(res.data)
      })
    }
    else{
      postData('workStatusUpdate',{status:'Rejected',chatid,workid:data.workid})
      .then(res=>{
        toast.success('Work Rejected')
        console.log(res.data)
      })
    }
  }
  return (
    <Row>
     <Col sm={6}>
        <div className=' my-2 d-flex justify-content-start ms-4 text-center '>
        <section className="wrapper my-3 ">
            <div className=" mb-4 ">
              <div className="card shadow" >
              <div className="card-body">
                  <h5 className="card-title mt-0">
                    <div className="text-dark" ><p>{data.workName}</p></div>
                  </h5>
                  <small className="card-meta mb-2 d-block">{data.description}</small>
                  <small><i className="far fa-clock me-2"></i>{data.workdate}</small>
                </div>
                <div className="card-footer">

                <Row>
                     
                        <Col> <button className='btn btn-danger'onClick={e=>workStatusUpdate('Reject')}>Reject</button></Col>
                        <Col>
                        <button className='btn btn-success' onClick={e=>workStatusUpdate('Approve')}>Approve</button>
                      </Col>
                    </Row>


                </div>
              </div>
            </div>
          </section>      
        </div>
     </Col>
   </Row>
  )
}

export default OthersWorkReq
