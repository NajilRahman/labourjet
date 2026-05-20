import React, { useEffect, useState } from 'react';
import MessageCard from './MessageCard';
import ActiveChatView from './ActiveChatView';
import { postData } from '../apiServices/apiServices';
import Loading from './spinner';
import { Row, Col } from 'react-bootstrap';

function Message() {
  const id = JSON.parse(localStorage.getItem('user'))._id;
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeChatId, setActiveChatId] = useState(null);

  useEffect(() => {
    postData('messageHistory', { id })
      .then((res) => {
        setUsers(res.data.reverse());
        setLoading(false);
      });
  }, []);

  return (
    <div 
      className="w-100 p-2 shadow-lg animate-fade-in" 
      style={{ 
        height: '84vh', 
        borderRadius: '24px',
        backgroundColor: 'rgba(255, 255, 255, 0.02)',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(20px)',
        overflow: 'hidden'
      }}
    >
      <Row className="g-0 h-100">
        {/* Left Chat List Column */}
        <Col 
          xs={12} 
          md={4} 
          className={`flex-column h-100 border-end ${activeChatId ? 'd-none d-md-flex' : 'd-flex'}`} 
          style={{ 
            borderColor: 'rgba(255,255,255,0.06)',
            padding: '16px',
            backgroundColor: 'rgba(0, 0, 0, 0.05)'
          }}
        >
          <div className="d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
            <h5 className="fw-bold mb-0 text-white"><i className="fa-regular fa-comments me-2 text-info"></i>Chats</h5>
            <span className="badge rounded-pill bg-info-subtle text-info border border-info-subtle" style={{ fontSize: '0.75rem', padding: '4px 10px' }}>
              {users.length} active
            </span>
          </div>

          <div className="flex-grow-1" style={{ overflowY: 'auto', maxHeight: '72vh' }}>
            {loading ? (
              <div className="d-flex justify-content-center align-items-center py-5">
                <Loading />
              </div>
            ) : users.length > 0 ? (
              <div className="d-flex flex-column gap-1">
                {users.map((obj) => (
                  <MessageCard 
                    key={obj._id} 
                    userData={obj} 
                    onSelectChat={(chatId) => setActiveChatId(chatId)} 
                    isActive={activeChatId !== null && activeChatId === obj._id}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-5 text-muted">
                <i className="fa-regular fa-comment-dots fa-2x mb-2 opacity-25 text-white"></i>
                <p className="text-white opacity-50 mb-0" style={{ fontSize: '0.8rem' }}>No conversations yet</p>
              </div>
            )}
          </div>
        </Col>

        {/* Right Active Chat Panel */}
        <Col xs={12} md={8} className={`h-100 ${activeChatId ? 'd-block' : 'd-none d-md-block'}`}>
          {activeChatId ? (
            <ActiveChatView 
              chatId={activeChatId} 
              viewerid={id} 
              onBack={() => setActiveChatId(null)}
            />
          ) : (
            <div className="h-100 d-flex flex-column align-items-center justify-content-center p-5 text-center position-relative">
              {/* WhatsApp like background element */}
              <div 
                className="position-absolute w-100 h-100 opacity-5" 
                style={{
                  top: 0,
                  left: 0,
                  backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.15) 1px, transparent 0)',
                  backgroundSize: '24px 24px'
                }}
              ></div>
              <div className="position-relative z-1">
                <div 
                  className="rounded-circle d-flex align-items-center justify-content-center mb-4 shadow"
                  style={{ 
                    width: '100px', 
                    height: '100px', 
                    background: 'radial-gradient(circle, rgba(56,189,248,0.15) 0%, rgba(56,189,248,0.02) 100%)',
                    border: '1px solid rgba(56,189,248,0.25)',
                    animation: 'pulse-glow 3s infinite'
                  }}
                >
                  <i className="fa-solid fa-comments text-info fa-3x"></i>
                </div>
                <h4 className="fw-bold text-white mb-2">LabourJet Messenger</h4>
                <p className="text-white opacity-50 mx-auto" style={{ fontSize: '0.9rem', maxWidth: '380px' }}>
                  Select a specialist or hirer from the left conversations list to start real-time messaging, project requests and safe payments!
                </p>
                <div className="mt-4 d-flex justify-content-center gap-3">
                  <span className="badge bg-glass border text-white opacity-75 py-2 px-3 rounded-pill" style={{ fontSize: '0.75rem', borderColor: 'rgba(255,255,255,0.08)' }}>
                    <i className="fa-solid fa-bolt text-warning me-1"></i> Real-time Socket Connection
                  </span>
                  <span className="badge bg-glass border text-white opacity-75 py-2 px-3 rounded-pill" style={{ fontSize: '0.75rem', borderColor: 'rgba(255,255,255,0.08)' }}>
                    <i className="fa-solid fa-lock text-success me-1"></i> Secure Chats
                  </span>
                </div>
              </div>
            </div>
          )}
        </Col>
      </Row>
    </div>
  );
}

export default Message;
