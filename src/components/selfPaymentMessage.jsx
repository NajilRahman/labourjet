import React from 'react'
import { Col, Row } from 'react-bootstrap'

function SelfPaymentMessage({ data }) {
  return (
    <Row className="g-0 my-2">
      <Col xs={2} sm={4} md={5}></Col>
      <Col xs={10} sm={8} md={7}>
        <div className="d-flex justify-content-end pe-2">
          <div 
            className="p-3 text-start text-white shadow-sm"
            style={{
              background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.3) 0%, rgba(5, 150, 105, 0.25) 100%)',
              border: '1px solid rgba(16, 185, 129, 0.4)',
              borderRadius: '16px 16px 4px 16px',
              minWidth: '220px',
              maxWidth: '85%'
            }}
          >
            <div className="d-flex align-items-center gap-2 mb-2 pb-2 border-bottom" style={{ borderColor: 'rgba(255,255,255,0.15)' }}>
              <i className="fa-solid fa-indian-rupee-sign text-success fa-lg"></i>
              <span className="fw-bold text-white" style={{ fontSize: '0.9rem' }}>Payment Requested</span>
            </div>
            <div className="mb-2">
              <small className="d-block text-white" style={{ fontSize: '0.75rem', opacity: 0.85 }}>Amount requested by you</small>
              <h4 className="fw-bold text-white mb-0 mt-1">{data.amount} INR</h4>
            </div>
            <span className="badge bg-success-subtle text-success border border-success-subtle py-1 px-2" style={{ fontSize: '0.7rem' }}>
              Pending Payment
            </span>
          </div>
        </div>
      </Col>
    </Row>
  )
}

export default SelfPaymentMessage;
