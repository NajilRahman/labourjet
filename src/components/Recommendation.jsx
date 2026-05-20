import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { postData } from '../apiServices/apiServices';

function Recommendation({ userData, render }) {
  const [viewer, setViewer] = useState(JSON.parse(localStorage.getItem('user')));
  const [followed, setFolllowed] = useState(!userData?.follower?.includes(viewer?._id));
  const navi = useNavigate();

  const followRequest = (reqType) => {
    postData('followUpdate', { userData, viewerid: viewer._id, reqType })
      .then(res => {
        setFolllowed(!followed);
        render(res);
      });
  };

  const defaultAvatar = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150&q=80';

  return (
    <div className="card border-0 p-3 mb-3 text-start w-100 shadow-sm"
      style={{ borderRadius: '16px', transition: 'transform 0.2s ease, box-shadow 0.2s ease', cursor: 'default' }}
      onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-3px)'}
      onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
    >
      <div className="d-flex align-items-center gap-3">
        <img
          className="rounded-circle"
          style={{ height: '52px', width: '52px', objectFit: 'cover', border: '2px solid rgba(99,102,241,0.6)' }}
          src={userData?.imgUrl || defaultAvatar}
          alt={userData?.userName}
        />
        <div className="flex-grow-1 min-w-0">
          <div className="d-flex align-items-center gap-2">
            <span className="fw-bold text-truncate" style={{ fontSize: '0.95rem', color: '#f1f5f9' }}>{userData?.userName}</span>
            {userData?.userType === 'employee' && (
              <i className="fa-solid fa-circle-check fa-xs" style={{ color: '#38bdf8' }} title="Verified Specialist"></i>
            )}
          </div>
          <span className="d-block text-truncate" style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
            {userData?.userType === 'employee' ? userData.jobRole || 'Specialist' : 'Hirer'}
          </span>
        </div>
      </div>
      <div className="d-flex gap-2 mt-3 w-100">
        <button
          className="btn flex-grow-1 fw-semibold"
          style={{
            fontSize: '0.82rem',
            minHeight: '34px',
            borderRadius: '10px',
            background: followed ? 'linear-gradient(135deg, #4f46e5, #3b82f6)' : 'rgba(255,255,255,0.06)',
            color: '#fff',
            border: followed ? 'none' : '1px solid rgba(255,255,255,0.15)',
            transition: 'all 0.2s ease'
          }}
          onClick={() => followRequest(followed ? 'follow' : 'unfollow')}
        >
          {followed ? <><i className="fa-solid fa-user-plus me-1"></i>Follow</> : <><i className="fa-solid fa-user-minus me-1"></i>Unfollow</>}
        </button>
        <button
          className="btn fw-semibold"
          style={{
            fontSize: '0.82rem',
            minHeight: '34px',
            borderRadius: '10px',
            background: 'rgba(255,255,255,0.05)',
            color: '#e2e8f0',
            border: '1px solid rgba(255,255,255,0.12)',
            transition: 'all 0.2s ease'
          }}
          onClick={() => navi(`/user/${userData?._id}`)}
        >
          <i className="fa-solid fa-eye me-1"></i>View
        </button>
      </div>
    </div>
  );
}

export default Recommendation;
