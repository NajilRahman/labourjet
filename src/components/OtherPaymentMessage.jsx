import React from 'react'
import { Col, Row } from 'react-bootstrap'

function OtherPaymentMessage({ data }) {
  return (
    <Row className="g-0 my-2">
      <Col xs={10} sm={8} md={7}>
        <div className="d-flex justify-content-start ps-2">
          <div 
            className="p-3 text-start text-white shadow-sm"
            style={{
              background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.28) 0%, rgba(3, 105, 161, 0.22) 100%)',
              border: '1px solid rgba(56, 189, 248, 0.45)',
              borderRadius: '16px 16px 16px 4px',
              minWidth: '240px',
              maxWidth: '85%'
            }}
          >
            <div className="d-flex align-items-center gap-2 mb-2 pb-2 border-bottom" style={{ borderColor: 'rgba(255,255,255,0.18)' }}>
              <i className="fa-solid fa-indian-rupee-sign text-info fa-lg"></i>
              <span className="fw-bold text-white" style={{ fontSize: '0.9rem' }}>Payment Requested</span>
            </div>
            <div className="mb-3 d-flex justify-content-between align-items-end">
              <div>
                <small className="d-block text-white" style={{ fontSize: '0.75rem', opacity: 0.85 }}>Amount requested</small>
                <h4 className="fw-bold text-white mb-0 mt-1">{data.amount} INR</h4>
              </div>
              <img 
                src={`https://api.qrserver.com/v1/create-qr-code/?size=80x80&data=${data.msg}`} 
                className="rounded border shadow-sm" 
                style={{ width: '60px', height: '60px', backgroundColor: '#fff', padding: '3px' }}
                alt="QR Code" 
              />
            </div>
            <a href={data.msg} className="btn btn-success w-100 rounded-pill fw-semibold border-0 py-2" style={{ fontSize: '0.85rem' }}>
              <i className="fa-solid fa-credit-card me-2"></i>Pay Now
            </a>
          </div>
        </div>
      </Col>
      <Col xs={2} sm={4} md={5}></Col>
    </Row>
  )
}

export default OtherPaymentMessage;
