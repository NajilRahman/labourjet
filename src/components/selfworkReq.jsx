import React from 'react'
import { Col, Row } from 'react-bootstrap'

function SelfworkReq({ data }) {
  return (
    <Row className="g-0 my-2">
      <Col xs={2} sm={4} md={5}></Col>
      <Col xs={10} sm={8} md={7}>
        <div className="d-flex justify-content-end pe-2">
          <div 
            className="p-3 text-start text-white shadow-sm"
            style={{
              background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.32) 0%, rgba(79, 70, 229, 0.25) 100%)',
              border: '1px solid rgba(99, 102, 241, 0.45)',
              borderRadius: '16px 16px 4px 16px',
              minWidth: '240px',
              maxWidth: '85%'
            }}
          >
            <div className="d-flex align-items-center gap-2 mb-2 pb-2 border-bottom" style={{ borderColor: 'rgba(255,255,255,0.18)' }}>
              <i className="fa-solid fa-briefcase text-info fa-lg"></i>
              <span className="fw-bold text-white" style={{ fontSize: '0.9rem' }}>Work Request Sent</span>
            </div>
            <h6 className="fw-bold text-white mb-1">{data.workName}</h6>
            <p className="text-white mb-2" style={{ fontSize: '0.85rem', lineHeight: '1.4', opacity: 0.9 }}>{data.description}</p>
            <div className="d-flex justify-content-between align-items-center mt-3 pt-2 border-top" style={{ borderColor: 'rgba(255,255,255,0.18)' }}>
              <small className="text-white" style={{ opacity: 0.85 }}><i className="far fa-clock me-1"></i>{data.date}</small>
              <span className={`badge py-1 px-2 rounded-pill ${
                data.status === 'Approved' ? 'bg-success text-white' : data.status === 'Rejected' ? 'bg-danger text-white' : 'bg-warning text-dark'
              }`} style={{ fontSize: '0.7rem' }}>
                {data.status || 'Pending'}
              </span>
            </div>
          </div>
        </div>
      </Col>
    </Row>
  )
}

export default SelfworkReq;
