import React from 'react';
import { Col, Row } from 'react-bootstrap';

function OthersMessage({ message }) {
  const formattedTime = message.date 
    ? new Date(message.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    : new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <Row className="g-0">
      <Col xs={10} sm={8} md={7}>
        <div className="my-1 d-flex justify-content-start ps-2">
          <div 
            className="text-start px-3 py-2 text-white shadow-sm position-relative" 
            style={{ 
              overflow: 'hidden', 
              height: 'auto', 
              wordWrap: 'break-word', 
              maxWidth: '85%',
              backgroundColor: 'rgba(255, 255, 255, 0.18)', 
              backdropFilter: 'blur(12px)',
              borderRadius: '16px 16px 16px 4px',
              border: '1px solid rgba(255, 255, 255, 0.18)',
              fontWeight: '500',
              paddingRight: '48px'
            }}
          >
            <span style={{ fontSize: '0.92rem', lineHeight: '1.4' }}>{message.msg}</span>
            <span 
              style={{ 
                fontSize: '0.65rem', 
                color: 'rgba(255,255,255,0.7)', 
                position: 'absolute', 
                bottom: '4px', 
                right: '8px',
                fontWeight: '500'
              }}
            >
              {formattedTime}
            </span>
          </div>
        </div>
      </Col>
      <Col xs={2} sm={4} md={5}></Col>
    </Row>
  );
}

export default OthersMessage;
