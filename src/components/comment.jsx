import React, { useState, useEffect } from 'react';
import { postData } from '../apiServices/apiServices';
import { useNavigate } from 'react-router-dom';
import { Form, Button, InputGroup } from 'react-bootstrap';

function CommentMessage({ commentObj, comment, userid, reRender, handleClose }) {
  const [user, setUser] = useState({});
  const [replies, setReplies] = useState(commentObj?.replies || []);
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [replyText, setReplyText] = useState('');
  
  const navi = useNavigate();
  
  // Get active session user
  const currentUserStr = localStorage.getItem('user');
  const currentUser = currentUserStr ? JSON.parse(currentUserStr) : null;
  const currentUserId = currentUser?._id;
  const [currentUserName, setCurrentUserName] = useState('Anonymous');

  useEffect(() => {
    // Fetch commenter info
    postData('user', { id: userid })
      .then(res => {
        setUser(res.data);
      });

    // Fetch active session user info
    if (currentUserId) {
      postData('user', { id: currentUserId })
        .then(res => {
          setCurrentUserName(res.data.userName || 'Anonymous');
        });
    }
  }, [userid, currentUserId]);

  const handleSendReply = () => {
    if (!replyText.trim() || !commentObj?._id) return;

    const payload = {
      commentId: commentObj._id,
      reply: replyText,
      commenterid: currentUserId,
      userName: currentUserName
    };

    postData('replyComment', payload)
      .then(res => {
        setReplies(res.data.replies || []);
        setReplyText('');
        setShowReplyInput(false);
      });
  };

  return (
    <div className='d-flex flex-column mb-3 fade-in-up w-100'>
      {/* Comment Row */}
      <div className='d-flex align-items-start w-100'>
        <img 
          src={user?.imgUrl || 'https://via.placeholder.com/40'} 
          alt="avatar" 
          className="rounded-circle me-3 shadow-sm border border-secondary border-opacity-25" 
          style={{ width: '40px', height: '40px', objectFit: 'cover', cursor: 'pointer' }} 
          onClick={e => { navi(`/user/${user._id}`); if(reRender) reRender(`/user/${user._id}`); handleClose(); }} 
        />
        <div className='flex-grow-1 p-3 rounded-4 shadow-sm' style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
          <h6 className='mb-1 fw-bold text-white' style={{ cursor: 'pointer' }} onClick={e => { navi(`/user/${user._id}`); if(reRender) reRender(`/user/${user._id}`); handleClose(); }}>
            {user.userName}
            {user.userType === 'employee' && (
              <svg className='ms-2' style={{ width: '16px' }} id="Capa_1" enableBackground="new 0 0 512 512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                <g>
                  <path d="m256 512c-66.012-37.684-225-151.29-225-377.76v-73.14h15c34.673 1.377 118.623-.163 201.68-55.548l8.32-5.552 8.32 5.552c83.159 55.444 167.314 56.779 199.424 55.607l17.256-.159v73.24c0 267.383-221.99 374.756-225 377.76z" fill="#f0f7ff"/>
                  <path d="m481 134.24v-73.24l-17.256.159c-32.109 1.172-116.265-.163-199.424-55.607l-8.32-5.552v512c3.01-3.005 225-110.379 225-377.76z" fill="#c7cfe1"/>
                  <path d="m256 443.38c-2.617-3-165-99.914-165-309.141v-13.374l13.286-2.432c50.859-5.874 99.507-21.196 144.58-45.571l7.134-3.852 7.134 3.853c45.073 24.375 93.721 39.697 144.58 45.571l13.286 1.524v13.374c0 205.199-162.252 306.898-165 310.048z" fill="#7ed8f6"/>
                  <path d="m421 133.332v-13.374l-13.286-1.523c-50.859-5.874-99.507-21.196-144.58-45.571l-7.134-3.854v374.37c2.748-3.151 165-104.849 165-310.048z" fill="#4895ff"/>
                  <path d="m241 307.311-55.605-55.605 21.21-21.211 34.395 34.394 79.395-79.394 21.21 21.211z" fill="#f0f7ff"/>
                  <path d="m256 292.311 85.605-85.605-21.21-21.211-64.395 64.394z" fill="#c7cfe1"/>
                </g>
              </svg>
            )}
          </h6>
          <p className='mb-2 text-light' style={{ fontSize: '0.95rem', lineHeight: '1.5' }}>
            {comment}
          </p>

          {/* Action Row */}
          <div className='d-flex align-items-center gap-3'>
            {commentObj?._id && (
              <button 
                className='btn btn-link text-info p-0 text-decoration-none d-flex align-items-center gap-1' 
                style={{ fontSize: '0.78rem', fontWeight: '500' }}
                onClick={() => setShowReplyInput(!showReplyInput)}
              >
                <i className="fa-solid fa-reply"></i> Reply
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Nested Replies */}
      {replies.length > 0 && (
        <div className='d-flex flex-column gap-2 mt-2' style={{ paddingLeft: '56px' }}>
          {replies.map((rep, idx) => (
            <div 
              key={idx} 
              className='p-3 rounded-4 shadow-sm border text-start fade-in-up' 
              style={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.03)', 
                borderColor: 'rgba(255, 255, 255, 0.04)',
                fontSize: '0.88rem'
              }}
            >
              <div className='d-flex align-items-center gap-2 mb-1'>
                <span className='fw-bold text-white'>{rep.userName || 'User'}</span>
                <span style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.4)' }}>
                  {rep.date ? new Date(rep.date).toLocaleDateString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : ''}
                </span>
              </div>
              <p className='mb-0 text-light opacity-90' style={{ fontSize: '0.88rem', lineHeight: '1.4' }}>{rep.reply}</p>
            </div>
          ))}
        </div>
      )}

      {/* Reply Input Box */}
      {showReplyInput && (
        <div className='mt-2' style={{ paddingLeft: '56px' }}>
          <InputGroup className='shadow-sm'>
            <Form.Control 
              placeholder='Write a reply...'
              className='rounded-start-pill border-0 px-3 py-2 text-white'
              style={{ backgroundColor: 'rgba(255,255,255,0.06)', fontSize: '0.85rem' }}
              value={replyText}
              onChange={e => setReplyText(e.target.value)}
              onKeyPress={e => e.key === 'Enter' && handleSendReply()}
            />
            <Button 
              variant='info' 
              className='rounded-end-pill px-3 border-0 d-flex align-items-center'
              onClick={handleSendReply}
            >
              <i className="fa-solid fa-paper-plane text-white" style={{ fontSize: '0.8rem' }}></i>
            </Button>
          </InputGroup>
        </div>
      )}
    </div>
  );
}

export default CommentMessage;
