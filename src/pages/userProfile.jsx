import { useEffect, useState } from 'react';
import React from 'react';
import { Row, Col, Badge, Spinner } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { postData } from '../apiServices/apiServices';
import UserPostCard from '../components/userPostCard';
import Loading from '../components/spinner';

function UserProfile() {
  const _id = JSON.parse(localStorage.getItem('user'))._id;
  const [userPost, setUserPost] = useState([]);
  const [userData, setUserData] = useState('');
  const [ViewerData, setViewerData] = useState('');
  const [followed, setFolllowed] = useState(true);
  const [reRender, setReRender] = useState('');
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(0);

  //works
  const [works, setWorks] = useState([]);
  const { id } = useParams();
  const navi = useNavigate();

  useEffect(() => {
    //fetch userPost
    postData('fetchUserPost', { viewerid: id })
      .then(res => {
        setUserPost(res.data.reverse());
      });
  }, [reRender, id]);

  useEffect(() => {
    setLoading(true);
    postData('getWorksData', { id: id })
      .then(res => {
        setWorks(res.data.reverse());
        if (res.data.length > 0) {
          setRating(Math.round(res.data.reduce((prev, next) => prev + next.rating, 0) / res.data.length));
        } else {
          setRating(0);
        }
        setLoading(false);
      });
  }, [reRender, id]);

  const followRequest = (reqType) => {
    postData('followUpdate', { userData, viewerid: ViewerData._id, reqType })
      .then(res => {
        setFolllowed(!followed);
      });
  };

  const messageRedirect = () => {
    postData('messageRedirect', { user: [id, _id] })
      .then(res => {
        navi(`/message/${res.data._id}`);
      });
  };

  useEffect(() => {
    postData('user', { id: _id })
      .then(res => {
        setViewerData(res.data);
      });
    if (id) {
      postData('findUserById', { id })
        .then(res => {
          setUserData(res.data);
          setFolllowed(!res.data?.follower?.includes(_id));
          setLoading(false);
        });
    }
  }, [id, followed, _id]);

  const defaultAvatar = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150&q=80';

  return (
    <>
      {loading ? (
        <div style={{ height: '70vh' }} className='d-flex justify-content-center align-items-center'><Loading /></div>
      ) : (
        <div className="container py-4">
          <div className="card bg-glass border-0 p-4 mb-4 text-start shadow-lg" style={{ height: 'max-content' }}>
            <Row className="g-4">
              {/* Avatar Column */}
              <Col md={4} className="text-center text-md-start">
                <div className="d-flex flex-column align-items-center">
                  <img
                    className="rounded-circle border border-3 border-primary mb-3 shadow-lg"
                    style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                    src={userData?.imgUrl || defaultAvatar}
                    alt={userData?.userName}
                  />
                  <h4 className="fw-bold mb-1 d-flex align-items-center gap-2 justify-content-center text-white">
                    {userData?.userName}
                    {userData?.userType === 'employee' && (
                      <i className="fa-solid fa-circle-check text-info fa-xs" title="Verified Specialist"></i>
                    )}
                  </h4>
                  {userData?.userType === 'employee' && (
                    <div className="d-flex gap-1 my-2">
                      {[...Array(5)].map((_, i) => (
                        <i
                          key={i}
                          className={`fa-solid fa-star ${i < rating ? 'text-warning' : 'text-muted'}`}
                        ></i>
                      ))}
                      <span className="ms-2 text-muted" style={{ fontSize: '0.85rem' }}>({works.length} reviews)</span>
                    </div>
                  )}
                </div>
              </Col>

              {/* Stats & Details Column */}
              <Col md={8}>
                <div className="d-flex flex-wrap justify-content-around text-center p-3 rounded bg-glass border mb-4">
                  <div>
                    <span className="d-block fs-4 fw-bold text-white">{userPost.length}</span>
                    <span className="text-muted" style={{ fontSize: '0.85rem' }}>Posts</span>
                  </div>
                  <div>
                    <span className="d-block fs-4 fw-bold text-white">{userData?.follower?.length || 0}</span>
                    <span className="text-muted" style={{ fontSize: '0.85rem' }}>Followers</span>
                  </div>
                  {userData?.userType !== 'user' && (
                    <div>
                      <span className="d-block fs-4 fw-bold text-truncate text-white" style={{ maxWidth: '150px' }}>{userData?.jobRole || 'Specialist'}</span>
                      <span className="text-muted" style={{ fontSize: '0.85rem' }}>Job Role</span>
                    </div>
                  )}
                </div>

                {userData?.userType !== 'user' && userData?.skills?.length > 0 && (
                  <div className="mb-4">
                    <h6 className="text-muted mb-2">Skills & Certifications</h6>
                    <div className="d-flex flex-wrap gap-2">
                      {userData.skills.map((obj, idx) => (
                        <Badge key={idx} pill bg="primary" className="py-2 px-3">
                          {obj}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <div className="row g-3 text-start text-white">
                  <Col sm={6} className="d-flex align-items-center gap-2">
                    <i className="fa-regular fa-envelope text-primary"></i>
                    <span className="text-truncate">{userData?.email}</span>
                  </Col>
                  <Col sm={6} className="d-flex align-items-center gap-2">
                    <i className="fa-solid fa-phone text-primary"></i>
                    <span>{userData?.phone}</span>
                  </Col>
                  <Col sm={6} className="d-flex align-items-center gap-2">
                    <i className="fa-solid fa-envelopes-bulk text-primary"></i>
                    <span>{userData?.postal}</span>
                  </Col>
                  <Col sm={6} className="d-flex align-items-center gap-2">
                    <i className="fa-solid fa-location-dot text-primary"></i>
                    <span>{userData?.state}, India</span>
                  </Col>
                </div>
              </Col>

              {/* Action Buttons Column */}
              <Col sm={12}>
                <div className="d-flex flex-wrap flex-md-nowrap gap-3">
                  {followed ? (
                    <button
                      className="btn flex-grow-1 fw-semibold py-2"
                      style={{
                        minWidth: '140px',
                        background: 'linear-gradient(135deg, #4f46e5, #3b82f6)',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '10px',
                        transition: 'all 0.2s ease'
                      }}
                      onClick={() => followRequest('follow')}
                    >
                      <i className="fa-solid fa-user-plus me-2"></i>Follow
                    </button>
                  ) : (
                    <button
                      className="btn flex-grow-1 fw-semibold py-2"
                      style={{
                        minWidth: '140px',
                        background: 'rgba(255, 255, 255, 0.08)',
                        color: '#fff',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        borderRadius: '10px',
                        transition: 'all 0.2s ease'
                      }}
                      onClick={() => followRequest('unfollow')}
                    >
                      <i className="fa-solid fa-user-minus me-2"></i>Unfollow
                    </button>
                  )}

                  <button
                    className="btn flex-grow-1 fw-semibold py-2"
                    style={{
                      minWidth: '140px',
                      background: 'linear-gradient(135deg, #10b981, #059669)',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '10px',
                      transition: 'all 0.2s ease'
                    }}
                    onClick={messageRedirect}
                  >
                    <i className="fa-regular fa-comment-dots me-2"></i>Message
                  </button>
                </div>
              </Col>
            </Row>

            {/* User Publications Section */}
            <div className="mt-5 w-100">
              <h5 className="mb-4 text-gradient">Publications</h5>
              {userPost?.length > 0 ? (
                <Row className="g-4">
                  {userPost.map(obj => (
                    <Col md={6} key={obj._id}>
                      <UserPostCard post={obj} userData={userData} reRender={setReRender} />
                    </Col>
                  ))}
                </Row>
              ) : (
                <div className="text-center py-5 text-muted bg-glass rounded-4" style={{ border: '1px solid rgba(255, 255, 255, 0.05)' }}>
                  <i className="fa-regular fa-image fa-3x mb-3 opacity-25"></i>
                  <h5>No publications yet</h5>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default UserProfile;
