import React from 'react';
import { useNavigate } from 'react-router-dom';
import { postData } from '../apiServices/apiServices';

function MessageCard({ userData, onSelectChat, isActive }) {
  const navi = useNavigate();
  const id = JSON.parse(localStorage.getItem('user'))._id;

  const messageRedirect = () => {
    postData('messageRedirect', { user: [userData._id, id] })
      .then((res) => {
        if (onSelectChat) {
          onSelectChat(res.data._id);
        } else {
          navi(`/message/${res.data._id}`);
        }
      });
  };

  const defaultAvatar = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150&q=80';

  return (
    <div 
      onClick={messageRedirect}
      className="p-3 mb-2 rounded-4 text-start d-flex align-items-center justify-content-between position-relative cursor-pointer transition-all"
      style={{
        background: isActive ? 'rgba(56, 189, 248, 0.12)' : 'rgba(255, 255, 255, 0.03)',
        border: '1px solid',
        borderColor: isActive ? 'rgba(56, 189, 248, 0.3)' : 'rgba(255, 255, 255, 0.05)',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
      }}
      onMouseEnter={(e) => {
        if (!isActive) {
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)';
          e.currentTarget.style.borderColor = 'rgba(56, 189, 248, 0.2)';
        }
      }}
      onMouseLeave={(e) => {
        if (!isActive) {
          e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)';
        }
      }}
    >
      <div className="d-flex align-items-center gap-3 w-100">
        <div className="position-relative">
          <img 
            className="rounded-circle shadow" 
            style={{ height: '54px', width: '54px', objectFit: 'cover', border: '2px solid rgba(56, 189, 248, 0.3)' }} 
            src={userData.imgUrl || defaultAvatar} 
            alt="user avatar" 
          />
          <span 
            className="position-absolute bottom-0 end-0 rounded-circle" 
            style={{ 
              width: '12px', 
              height: '12px', 
              backgroundColor: '#10b981', 
              border: '2px solid #0f172a' 
            }}
          ></span>
        </div>

        <div className="flex-grow-1 text-truncate">
          <div className="d-flex align-items-center gap-2">
            <h6 className="fw-bold text-white mb-0" style={{ fontSize: '0.95rem' }}>
              {userData.userName}
            </h6>
            {userData.userType === 'employee' && (
              <i className="fa-solid fa-circle-check text-info fa-xs" title="Verified Specialist"></i>
            )}
          </div>
          <small className="text-muted d-block text-truncate text-capitalize" style={{ fontSize: '0.8rem', marginTop: '2px' }}>
            {userData.userType === 'employee' ? (userData.jobRole || 'Specialist') : 'Hirer'}
          </small>
        </div>
      </div>

      <div className="d-flex flex-column align-items-end justify-content-center">
        <i className="fa-solid fa-chevron-right text-white opacity-25 fa-sm"></i>
      </div>
    </div>
  );
}

export default MessageCard;
