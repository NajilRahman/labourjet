import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './css/userHome.css';
import Recommendation from '../components/Recommendation';
import Home from '../components/Home';
import Search from '../components/search';
import Work from '../components/work';
import Message from '../components/Message';
import Profile from '../components/profile';
import { postData } from '../apiServices/apiServices';

function LandingHome() {
  const [view, setView] = useState('home');
  const [loginedUser, setLoginedUser] = useState([]);
  const [recom, setRecom] = useState([]);
  const [loading, setLoading] = useState(true);
  const [render, setRender] = useState('');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const navi = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('user')) {
      if (localStorage.getItem('user') !== '') {
        const id = JSON.parse(localStorage.getItem('user'))._id;
        postData('user', { id })
          .then(res => {
            setLoginedUser(res.data);
            setLoading(false);
          });
      } else {
        localStorage.setItem('user', '');
        navi('/');
      }
    } else {
      localStorage.setItem('user', '');
      navi('/');
    }

    postData('recommend', { _id: JSON.parse(localStorage.getItem('user'))._id })
      .then(res => {
        setRecom(res.data);
      });
  }, [render]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navi('/Login');
  };

  const defaultAvatar = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150&q=80';

  // Dynamic layout column sizes based on collapsed state
  const sidebarSpan = isSidebarCollapsed ? { lg: 1, md: 1 } : { lg: 3, md: 4 };
  const contentSpan = isSidebarCollapsed ? { lg: 9, md: 11 } : { lg: 6, md: 8 };

  return (
    <>
      <div id="maindiv" className="w-100 px-3 py-2 fade-in-up" style={{ minHeight: '100vh' }}>
        <Row className="g-4 flex-nowrap-lg">
          {/* Left Sidebar */}
          <Col
            id="lside"
            lg={isSidebarCollapsed ? 'auto' : sidebarSpan.lg}
            md={isSidebarCollapsed ? 'auto' : sidebarSpan.md}
            className="d-none d-md-block p-3"
            style={{ 
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              width: isSidebarCollapsed ? '105px' : 'auto',
              flex: isSidebarCollapsed ? '0 0 105px' : 'none'
            }}
          >
            <div 
              className="card bg-glass h-100 p-3 d-flex flex-column align-items-center" 
              style={{ 
                minHeight: '88vh',
                maxWidth: isSidebarCollapsed ? '75px' : 'none',
                width: isSidebarCollapsed ? '75px' : '100%',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
                transition: 'all 0.3s ease'
              }}
            >
              {/* Sidebar Header & Toggle */}
              <div className={`d-flex align-items-center mb-4 gap-2 ${isSidebarCollapsed ? 'justify-content-center' : 'justify-content-between'}`}>
                {!isSidebarCollapsed && (
                  <div className="d-flex align-items-center gap-2">
                    <i className="fa-solid fa-rocket fa-xl text-info animate-bounce" style={{ color: '#38bdf8' }}></i>
                    <h4 className="mb-0 brand-text text-gradient fw-bold" style={{ fontSize: '1.25rem' }}>LabourJet</h4>
                  </div>
                )}
                <button
                  onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
                  className="btn btn-light d-flex align-items-center justify-content-center p-2 rounded-circle shadow-sm"
                  style={{
                    width: '32px',
                    height: '32px',
                    backgroundColor: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    color: '#fff',
                    transition: 'all 0.25s ease',
                    boxShadow: '0 0 10px rgba(56, 189, 248, 0.15)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.15)';
                    e.currentTarget.style.boxShadow = '0 0 15px rgba(56, 189, 248, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.06)';
                    e.currentTarget.style.boxShadow = '0 0 10px rgba(56, 189, 248, 0.15)';
                  }}
                  title={isSidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
                >
                  <i className={`fa-solid ${isSidebarCollapsed ? 'fa-chevron-right' : 'fa-chevron-left'} fa-xs`}></i>
                </button>
              </div>

              {/* Logged in User Profile Info (Only when expanded) */}
              {!isSidebarCollapsed && loginedUser && (
                <div 
                  className="p-3 mb-4 rounded-4 text-center d-flex flex-column align-items-center bg-white-10" 
                  style={{ 
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    borderRadius: '16px'
                  }}
                >
                  <img
                    src={loginedUser.imgUrl || defaultAvatar}
                    alt="Avatar"
                    className="rounded-circle mb-2 shadow"
                    style={{ width: '64px', height: '64px', objectFit: 'cover', border: '2.5px solid rgba(56,189,248,0.6)' }}
                  />
                  <h6 className="fw-bold mb-1 text-white text-truncate w-100" style={{ fontSize: '0.9rem' }}>
                    {loginedUser.userName || 'Specialist'}
                  </h6>
                  <span 
                    className="badge mb-2 text-capitalize text-info" 
                    style={{ 
                      fontSize: '0.7rem', 
                      background: 'rgba(56,189,248,0.1)',
                      border: '1px solid rgba(56,189,248,0.2)' 
                    }}
                  >
                    {loginedUser.userType || 'member'}
                  </span>
                  <div className="d-flex justify-content-center gap-3 w-100 mt-2 pt-2 border-top border-secondary" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
                    <div>
                      <small className="text-white opacity-50 d-block" style={{ fontSize: '0.65rem' }}>Followers</small>
                      <span className="fw-bold text-white" style={{ fontSize: '0.8rem' }}>{loginedUser.follower?.length || 0}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* User Avatar only when collapsed */}
              {isSidebarCollapsed && loginedUser && (
                <div className="text-center mb-4 d-flex justify-content-center">
                  <div 
                    className="position-relative p-1 rounded-circle shadow" 
                    style={{
                      background: 'linear-gradient(45deg, #0284c7, #10b981)',
                      cursor: 'pointer',
                      boxShadow: '0 0 12px rgba(56,189,248,0.4)',
                      transition: 'transform 0.25s ease'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.15)'}
                    onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    onClick={() => setView('profile')}
                    title="View Profile"
                  >
                    <img
                      src={loginedUser.imgUrl || defaultAvatar}
                      alt="Avatar"
                      className="rounded-circle"
                      style={{ width: '38px', height: '38px', objectFit: 'cover', border: '2px solid #0f172a' }}
                    />
                  </div>
                </div>
              )}

              {/* Sidebar Action Menu Buttons */}
              <div className="d-flex flex-column gap-2 text-start flex-grow-1 align-items-center align-items-md-stretch">
                <button
                  onClick={() => setView('home')}
                  className={`btn d-flex align-items-center gap-3 transition-all ${
                    view === 'home' 
                      ? 'btn-primary shadow' 
                      : 'btn-light border-0 bg-transparent text-white opacity-70 hover-glass-btn'
                  }`}
                  style={{ 
                    height: '45px', 
                    width: isSidebarCollapsed ? '45px' : '100%',
                    borderRadius: isSidebarCollapsed ? '50%' : '12px', 
                    padding: isSidebarCollapsed ? '0' : '0 16px',
                    justifyContent: isSidebarCollapsed ? 'center' : 'flex-start',
                    alignSelf: isSidebarCollapsed ? 'center' : 'stretch',
                    transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                  title="Home Feed"
                >
                  <i className="fa-solid fa-house fa-lg" style={{ width: '20px', textAlign: 'center' }}></i>
                  {!isSidebarCollapsed && <span style={{ fontSize: '0.9rem', fontWeight: '500' }}>Home Feed</span>}
                </button>

                <button
                  onClick={() => setView('search')}
                  className={`btn d-flex align-items-center gap-3 transition-all ${
                    view === 'search' 
                      ? 'btn-primary shadow' 
                      : 'btn-light border-0 bg-transparent text-white opacity-70 hover-glass-btn'
                  }`}
                  style={{ 
                    height: '45px', 
                    width: isSidebarCollapsed ? '45px' : '100%',
                    borderRadius: isSidebarCollapsed ? '50%' : '12px', 
                    padding: isSidebarCollapsed ? '0' : '0 16px',
                    justifyContent: isSidebarCollapsed ? 'center' : 'flex-start',
                    alignSelf: isSidebarCollapsed ? 'center' : 'stretch',
                    transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                  title="Search Jobs"
                >
                  <i className="fa-solid fa-magnifying-glass fa-lg" style={{ width: '20px', textAlign: 'center' }}></i>
                  {!isSidebarCollapsed && <span style={{ fontSize: '0.9rem', fontWeight: '500' }}>Search Jobs</span>}
                </button>

                <button
                  onClick={() => setView('work')}
                  className={`btn d-flex align-items-center gap-3 transition-all ${
                    view === 'work' 
                      ? 'btn-primary shadow' 
                      : 'btn-light border-0 bg-transparent text-white opacity-70 hover-glass-btn'
                  }`}
                  style={{ 
                    height: '45px', 
                    width: isSidebarCollapsed ? '45px' : '100%',
                    borderRadius: isSidebarCollapsed ? '50%' : '12px', 
                    padding: isSidebarCollapsed ? '0' : '0 16px',
                    justifyContent: isSidebarCollapsed ? 'center' : 'flex-start',
                    alignSelf: isSidebarCollapsed ? 'center' : 'stretch',
                    transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                  title="My Works"
                >
                  <i className="fa-solid fa-screwdriver-wrench fa-lg" style={{ width: '20px', textAlign: 'center' }}></i>
                  {!isSidebarCollapsed && <span style={{ fontSize: '0.9rem', fontWeight: '500' }}>My Works</span>}
                </button>

                <button
                  onClick={() => setView('msg')}
                  className={`btn d-flex align-items-center gap-3 transition-all ${
                    view === 'msg' 
                      ? 'btn-primary shadow' 
                      : 'btn-light border-0 bg-transparent text-white opacity-70 hover-glass-btn'
                  }`}
                  style={{ 
                    height: '45px', 
                    width: isSidebarCollapsed ? '45px' : '100%',
                    borderRadius: isSidebarCollapsed ? '50%' : '12px', 
                    padding: isSidebarCollapsed ? '0' : '0 16px',
                    justifyContent: isSidebarCollapsed ? 'center' : 'flex-start',
                    alignSelf: isSidebarCollapsed ? 'center' : 'stretch',
                    transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                  title="Messages"
                >
                  <i className="fa-regular fa-message fa-lg" style={{ width: '20px', textAlign: 'center' }}></i>
                  {!isSidebarCollapsed && <span style={{ fontSize: '0.9rem', fontWeight: '500' }}>Messages</span>}
                </button>

                <button
                  onClick={() => setView('profile')}
                  className={`btn d-flex align-items-center gap-3 transition-all ${
                    view === 'profile' 
                      ? 'btn-primary shadow' 
                      : 'btn-light border-0 bg-transparent text-white opacity-70 hover-glass-btn'
                  }`}
                  style={{ 
                    height: '45px', 
                    width: isSidebarCollapsed ? '45px' : '100%',
                    borderRadius: isSidebarCollapsed ? '50%' : '12px', 
                    padding: isSidebarCollapsed ? '0' : '0 16px',
                    justifyContent: isSidebarCollapsed ? 'center' : 'flex-start',
                    alignSelf: isSidebarCollapsed ? 'center' : 'stretch',
                    transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                  title="Profile"
                >
                  <i className="fa-regular fa-user fa-lg" style={{ width: '20px', textAlign: 'center' }}></i>
                  {!isSidebarCollapsed && <span style={{ fontSize: '0.9rem', fontWeight: '500' }}>Profile</span>}
                </button>

                <hr className="my-2 w-100 rgba-white-10" style={{ borderColor: 'rgba(255,255,255,0.08)' }} />

                <button
                  onClick={handleLogout}
                  className="btn d-flex align-items-center gap-3 border-0 bg-transparent text-danger mt-auto hover-scale"
                  style={{ 
                    height: '45px', 
                    width: isSidebarCollapsed ? '45px' : '100%',
                    borderRadius: isSidebarCollapsed ? '50%' : '12px', 
                    padding: isSidebarCollapsed ? '0' : '0 16px',
                    justifyContent: isSidebarCollapsed ? 'center' : 'flex-start',
                    alignSelf: isSidebarCollapsed ? 'center' : 'stretch',
                    transition: 'all 0.25s ease'
                  }}
                  title="Logout"
                >
                  <i className="fa-solid fa-right-from-bracket fa-lg text-danger" style={{ width: '20px', textAlign: 'center' }}></i>
                  {!isSidebarCollapsed && <span style={{ fontSize: '0.9rem', fontWeight: '500' }}>Logout</span>}
                </button>
              </div>
            </div>
          </Col>


          {/* Mobile Bottom Nav */}
          <div id="smnav" className="d-md-none fixed-bottom w-100 p-2 bg-glass border-top" style={{ zIndex: 1000, backdropFilter: 'blur(16px)', borderTopColor: 'rgba(255,255,255,0.08) !important' }}>
            <Row className="text-center g-0">
              <Col>
                <button onClick={() => setView('home')} className={`btn p-2 border-0 bg-transparent ${view === 'home' ? 'text-info' : 'text-secondary'}`}>
                  <i className="fa-solid fa-house fa-lg"></i>
                </button>
              </Col>
              <Col>
                <button onClick={() => setView('search')} className={`btn p-2 border-0 bg-transparent ${view === 'search' ? 'text-info' : 'text-secondary'}`}>
                  <i className="fa-solid fa-magnifying-glass fa-lg"></i>
                </button>
              </Col>
              <Col>
                <button onClick={() => setView('work')} className={`btn p-2 border-0 bg-transparent ${view === 'work' ? 'text-info' : 'text-secondary'}`}>
                  <i className="fa-solid fa-screwdriver-wrench fa-lg"></i>
                </button>
              </Col>
              <Col>
                <button onClick={() => setView('msg')} className={`btn p-2 border-0 bg-transparent ${view === 'msg' ? 'text-info' : 'text-secondary'}`}>
                  <i className="fa-regular fa-message fa-lg"></i>
                </button>
              </Col>
              <Col>
                <button onClick={() => setView('profile')} className={`btn p-2 border-0 bg-transparent ${view === 'profile' ? 'text-info' : 'text-secondary'}`}>
                  <i className="fa-regular fa-user fa-lg"></i>
                </button>
              </Col>
            </Row>
          </div>

          {/* Center Scroll Feed */}
          <Col 
            id="scroller" 
            lg={contentSpan.lg} 
            md={contentSpan.md} 
            sm={12} 
            className="px-3" 
            style={{ maxHeight: '95vh', overflowY: 'auto', transition: 'all 0.3s ease' }}
          >
            {view === 'profile' ? (
              <Profile userData={loginedUser} render={setRender} />
            ) : view === 'search' ? (
              <Search userData={loginedUser} render={setRender} />
            ) : view === 'work' ? (
              <Work userData={loginedUser} render={setRender} />
            ) : view === 'msg' ? (
              <Message userData={loginedUser} render={setRender} />
            ) : (
              <Home userData={loginedUser} render={setRender} />
            )}
          </Col>

          {/* Right Sidebar Recommendations */}
          <Col id="rside" lg={3} className="d-none d-lg-block p-4">
            <div className="card bg-glass border-0 h-100 p-3" style={{ minHeight: '88vh' }}>
              <div className="card-body p-0">
                <h5 className="mb-4 text-start font-weight-bold text-gradient" style={{ fontSize: '1.05rem' }}>Recommended Specialists</h5>
                <div style={{ maxHeight: '80vh', overflowY: 'auto' }} className="d-flex flex-column gap-3">
                  {recom.length > 0 ? (
                    recom.map(obj => (
                      <Recommendation key={obj._id} userData={obj} render={setRender} />
                    ))
                  ) : (
                    <p className="text-muted text-start" style={{ fontSize: '0.85rem' }}>No recommendations available</p>
                  )}
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default LandingHome;
