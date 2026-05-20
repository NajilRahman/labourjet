import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { postData } from '../apiServices/apiServices'
import toast from 'react-hot-toast'

function OthersWorkReq({ data, chatid }) {
  const [status, setStatus] = useState(data.status || 'Pending');

  const workStatusUpdate = (req) => {
    const newStatus = req === 'Approve' ? 'Approved' : 'Rejected';
    postData('workStatusUpdate', { status: newStatus, chatid, workid: data.workid })
      .then(res => {
        toast.success(`Work ${newStatus}`);
        setStatus(newStatus);
      });
  }

  return (
    <Row className="g-0 my-2">
      <Col xs={10} sm={8} md={7}>
        <div className="d-flex justify-content-start ps-2">
          <div 
            className="p-3 text-start text-white shadow-sm"
            style={{
              background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.32) 0%, rgba(79, 70, 229, 0.25) 100%)',
              border: '1px solid rgba(99, 102, 241, 0.45)',
              borderRadius: '16px 16px 16px 4px',
              minWidth: '240px',
              maxWidth: '85%'
            }}
          >
            <div className="d-flex align-items-center gap-2 mb-2 pb-2 border-bottom" style={{ borderColor: 'rgba(255,255,255,0.18)' }}>
              <i className="fa-solid fa-briefcase text-info fa-lg"></i>
              <span className="fw-bold text-white" style={{ fontSize: '0.9rem' }}>Work Request Received</span>
            </div>
            <h6 className="fw-bold text-white mb-1">{data.workName}</h6>
            <p className="text-white mb-2" style={{ fontSize: '0.85rem', lineHeight: '1.4', opacity: 0.9 }}>{data.description}</p>
            <div className="d-flex align-items-center gap-2 mb-3">
              <small className="text-white" style={{ opacity: 0.85 }}><i className="far fa-clock me-1"></i>{data.workdate}</small>
            </div>
            
            {status === 'Pending' ? (
              <Row className="g-2 pt-2 border-top" style={{ borderColor: 'rgba(255,255,255,0.18)' }}>
                <Col>
                  <button className="btn btn-outline-danger w-100 rounded-pill py-1.5 fw-semibold" style={{ fontSize: '0.8rem' }} onClick={() => workStatusUpdate('Reject')}>
                    Reject
                  </button>
                </Col>
                <Col>
                  <button className="btn btn-success w-100 rounded-pill py-1.5 fw-semibold border-0" style={{ fontSize: '0.8rem' }} onClick={() => workStatusUpdate('Approve')}>
                    Approve
                  </button>
                </Col>
              </Row>
            ) : (
              <div className="pt-2 border-top text-end" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
                <span className={`badge py-1 px-2 rounded-pill ${
                  status === 'Approved' ? 'bg-success text-white' : 'bg-danger text-white'
                }`} style={{ fontSize: '0.7rem' }}>
                  {status}
                </span>
              </div>
            )}
          </div>
        </div>
      </Col>
      <Col xs={2} sm={4} md={5}></Col>
    </Row>
  )
}

export default OthersWorkReq;
