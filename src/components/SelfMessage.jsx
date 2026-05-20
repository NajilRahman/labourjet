import React from 'react';
import { Col, Row } from 'react-bootstrap';

function SelfMessage({ message }) {
  const formattedTime = message.date 
    ? new Date(message.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    : new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <Row className="g-0">
      <Col xs={2} sm={4} md={5}></Col>
      <Col xs={10} sm={8} md={7}>
        <div className="my-1 d-flex justify-content-end pe-2">
          <div 
            className="text-start px-3 py-2 text-white shadow-sm position-relative" 
            style={{ 
              overflow: 'hidden', 
              height: 'auto', 
              wordWrap: 'break-word', 
              maxWidth: '85%',
              background: 'linear-gradient(135deg, #056162 0%, #075E54 100%)', 
              borderRadius: '16px 16px 4px 16px',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              fontWeight: '450',
              paddingRight: '48px' // Leave space for timestamp
            }}
          >
            <span style={{ fontSize: '0.92rem', lineHeight: '1.4' }}>{message.msg}</span>
            <span 
              style={{ 
                fontSize: '0.65rem', 
                color: 'rgba(255,255,255,0.6)', 
                position: 'absolute', 
                bottom: '4px', 
                right: '8px',
                fontWeight: 'normal'
              }}
            >
              {formattedTime} <i className="fa-solid fa-check-double ms-1 text-info" style={{ fontSize: '0.6rem' }}></i>
            </span>
          </div>
        </div>
      </Col>
    </Row>
  );
}

export default SelfMessage;
